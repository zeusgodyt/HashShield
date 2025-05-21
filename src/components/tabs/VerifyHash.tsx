import React, { useState } from 'react';
import { CheckCircle, XCircle } from 'lucide-react';
import FileUploader from '../FileUploader';
import { calculateFileHash } from '../../utils/hashUtils';
import { useToast } from '../../context/ToastContext';

const VerifyHash: React.FC = () => {
  const { addToast } = useToast();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [expectedHash, setExpectedHash] = useState<string>('');
  const [isVerifying, setIsVerifying] = useState<boolean>(false);
  const [verificationResult, setVerificationResult] = useState<boolean | null>(null);
  
  const handleFileSelected = (file: File) => {
    setSelectedFile(file);
    resetVerification();
  };
  
  const clearFile = () => {
    setSelectedFile(null);
    resetVerification();
  };
  
  const resetVerification = () => {
    setVerificationResult(null);
  };
  
  const handleExpectedHashChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setExpectedHash(e.target.value.trim());
    resetVerification();
  };
  
  const verifyHash = async () => {
    if (!selectedFile || !expectedHash) {
      addToast('Please select a file and provide the expected hash', 'warning');
      return;
    }
    
    try {
      setIsVerifying(true);
      const actualHash = await calculateFileHash(selectedFile);
      const matches = actualHash.toLowerCase() === expectedHash.toLowerCase();
      setVerificationResult(matches);
      
      if (matches) {
        addToast('Hash verification successful! File is authentic.', 'success');
      } else {
        addToast('Hash verification failed! File may be corrupted or tampered.', 'error');
      }
    } catch (error) {
      console.error('Error verifying hash:', error);
      addToast('Failed to verify hash', 'error');
    } finally {
      setIsVerifying(false);
    }
  };
  
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Verify File Integrity</h2>
      
      <FileUploader
        onFileSelected={handleFileSelected}
        selectedFile={selectedFile}
        onClearFile={clearFile}
      />
      
      <div className="mb-6">
        <label htmlFor="expected-hash" className="block font-medium mb-2 text-gray-700 dark:text-gray-300">
          Expected SHA-256 Hash:
        </label>
        <textarea
          id="expected-hash"
          value={expectedHash}
          onChange={handleExpectedHashChange}
          placeholder="Paste the expected SHA-256 hash here"
          className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 font-mono resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          rows={2}
        />
      </div>
      
      <div className="mb-6">
        <button
          onClick={verifyHash}
          disabled={isVerifying || !selectedFile || !expectedHash}
          className={`w-full py-2 px-4 rounded-lg font-medium transition-colors ${
            isVerifying || !selectedFile || !expectedHash
              ? 'bg-gray-400 dark:bg-gray-600 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700 text-white'
          }`}
        >
          {isVerifying ? 'Verifying...' : 'Verify Hash'}
        </button>
      </div>
      
      {verificationResult !== null && (
        <div className={`p-4 rounded-lg mb-6 animate-fadeIn ${
          verificationResult 
            ? 'bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800' 
            : 'bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800'
        }`}>
          <div className="flex items-center">
            {verificationResult ? (
              <CheckCircle className="h-6 w-6 text-green-500 dark:text-green-400 mr-2" />
            ) : (
              <XCircle className="h-6 w-6 text-red-500 dark:text-red-400 mr-2" />
            )}
            <h3 className={`font-medium ${
              verificationResult 
                ? 'text-green-800 dark:text-green-300' 
                : 'text-red-800 dark:text-red-300'
            }`}>
              {verificationResult 
                ? 'Match: File is Authentic' 
                : 'Mismatch: File May Be Tampered'}
            </h3>
          </div>
        </div>
      )}
    </div>
  );
};

export default VerifyHash;