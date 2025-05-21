import React from 'react';
import { ShieldCheck, FileCheck, AlertTriangle } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 transition-all duration-200">
      <h2 className="text-xl font-semibold mb-4 flex items-center">
        <ShieldCheck className="h-5 w-5 mr-2 text-blue-600 dark:text-blue-400" />
        <span>How to Use File Integrity Checker</span>
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-900">
          <h3 className="font-medium text-blue-600 dark:text-blue-400 mb-2 flex items-center">
            <FileCheck className="h-4 w-4 mr-2" />
            <span>Generating a Hash</span>
          </h3>
          <ol className="list-decimal list-inside space-y-2 text-gray-700 dark:text-gray-300 text-sm">
            <li>Select the "Generate Hash" tab</li>
            <li>Upload your file using drag & drop or file browser</li>
            <li>Click the "Generate SHA-256 Hash" button</li>
            <li>Copy the generated hash or download it as a text file</li>
            <li>Optionally, view the QR code representation of the hash</li>
          </ol>
        </div>
        
        <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-900">
          <h3 className="font-medium text-blue-600 dark:text-blue-400 mb-2 flex items-center">
            <AlertTriangle className="h-4 w-4 mr-2" />
            <span>Verifying a Hash</span>
          </h3>
          <ol className="list-decimal list-inside space-y-2 text-gray-700 dark:text-gray-300 text-sm">
            <li>Select the "Verify Hash" tab</li>
            <li>Upload the file you want to verify</li>
            <li>Paste the expected SHA-256 hash</li>
            <li>Click the "Verify Hash" button</li>
            <li>Check the result to confirm if the file is authentic</li>
          </ol>
        </div>
      </div>
      
      <div className="mt-6">
        <h3 className="font-medium mb-2 text-gray-700 dark:text-gray-300">What is SHA-256?</h3>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          SHA-256 (Secure Hash Algorithm 256-bit) is a cryptographic hash function that generates a unique 
          256-bit (32-byte) hash. It's part of the SHA-2 family designed by the NSA and is widely used in 
          security applications and protocols, including TLS, SSL, PGP, SSH, and cryptocurrencies like Bitcoin.
        </p>
      </div>
      
      <div className="mt-4 text-xs text-gray-500 dark:text-gray-400 text-center">
        <p>© 2025 File Integrity Checker - All computations performed locally in your browser</p>
      </div>
    </footer>
  );
};

export default Footer;