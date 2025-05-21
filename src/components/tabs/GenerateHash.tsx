import React, { useState } from 'react';
import { ClipboardCopy, Download, QrCode } from 'lucide-react';
import FileUploader from '../FileUploader';
import { calculateFileHash, downloadHashAsFile } from '../../utils/hashUtils';
import { addRecentHash } from '../../utils/storageUtils';
import { useToast } from '../../context/ToastContext';
import RecentHashes from '../RecentHashes';
import HashQRCode from '../HashQRCode';

const GenerateHash: React.FC = () => {
  const { addToast } = useToast();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fileHash, setFileHash] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [showQR, setShowQR] = useState<boolean>(false);
  
  const handleFileSelected = (file: File) => {
    setSelectedFile(file);
    setFileHash('');
    setShowQR(false);
  };
  
  const clearFile = () => {
    setSelectedFile(null);
    setFileHash('');
    setShowQR(false);
  };
  
  const generateHash = async () => {
    if (!selectedFile) return;
    
    try {
      setIsGenerating(true);
      const hash = await calculateFileHash(selectedFile);
      setFileHash(hash);
      
      // Store in recent hashes
      addRecentHash({
        filename: selectedFile.name,
        hash: hash,
        fileSize: selectedFile.size
      });
      
      addToast('Hash generated successfully', 'success');
    } catch (error) {
      console.error('Error generating hash:', error);
      addToast('Failed to generate hash', 'error');
    } finally {
      setIsGenerating(false);
    }
  };
  
  const copyToClipboard = () => {
    navigator.clipboard.writeText(fileHash)
      .then(() => addToast('Hash copied to clipboard', 'success'))
      .catch(() => addToast('Failed to copy hash', 'error'));
  };
  
  const handleDownloadHash = () => {
    if (selectedFile && fileHash) {
      downloadHashAsFile(fileHash, selectedFile.name);
      addToast('Hash downloaded as text file', 'success');
    }
  };
  
  const toggleQRCode = () => {
    setShowQR(prev => !prev);
  };
  
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Generate SHA-256 Hash</h2>
      
      <FileUploader
        onFileSelected={handleFileSelected}
        selectedFile={selectedFile}
        onClearFile={clearFile}
      />
      
      {selectedFile && (
        <div className="mb-6">
          <button
            onClick={generateHash}
            disabled={isGenerating}
            className={`w-full py-2 px-4 rounded-lg font-medium transition-colors ${
              isGenerating
                ? 'bg-gray-400 dark:bg-gray-600 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700 text-white'
            }`}
          >
            {isGenerating ? 'Generating...' : 'Generate SHA-256 Hash'}
          </button>
        </div>
      )}
      
      {fileHash && (
        <div className="mb-6 animate-fadeIn">
          <div className="bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
            <h3 className="font-medium mb-2 text-gray-700 dark:text-gray-300">SHA-256 Hash:</h3>
            <div className="flex">
              <div className="flex-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded p-3 font-mono text-sm overflow-x-auto">
                {fileHash}
              </div>
              <button
                onClick={copyToClipboard}
                className="ml-2 p-3 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 bg-blue-50 dark:bg-blue-900/30 rounded transition-colors"
                aria-label="Copy to clipboard"
              >
                <ClipboardCopy size={20} />
              </button>
            </div>
            
            <div className="flex space-x-2 mt-4">
              <button
                onClick={handleDownloadHash}
                className="flex items-center py-2 px-4 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 rounded transition-colors"
              >
                <Download size={16} className="mr-2" />
                <span>Download</span>
              </button>
              
              <button
                onClick={toggleQRCode}
                className="flex items-center py-2 px-4 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 rounded transition-colors"
              >
                <QrCode size={16} className="mr-2" />
                <span>{showQR ? 'Hide QR' : 'Show QR'}</span>
              </button>
            </div>
            
            {showQR && (
              <div className="mt-4 flex justify-center">
                <HashQRCode hash={fileHash} />
              </div>
            )}
          </div>
        </div>
      )}
      
      <RecentHashes />
    </div>
  );
};

export default GenerateHash;