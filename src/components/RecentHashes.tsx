import React, { useState, useEffect } from 'react';
import { ClipboardCopy, Trash2, RefreshCw } from 'lucide-react';
import { getRecentHashes, clearRecentHashes, StoredHash } from '../utils/storageUtils';
import { formatFileSize } from '../utils/hashUtils';
import { useToast } from '../context/ToastContext';

const RecentHashes: React.FC = () => {
  const { addToast } = useToast();
  const [recentHashes, setRecentHashes] = useState<StoredHash[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  
  useEffect(() => {
    loadRecentHashes();
  }, []);
  
  const loadRecentHashes = () => {
    setRecentHashes(getRecentHashes());
  };
  
  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };
  
  const handleClear = () => {
    clearRecentHashes();
    setRecentHashes([]);
    addToast('Recent hashes cleared', 'info');
  };
  
  const copyToClipboard = (hash: string) => {
    navigator.clipboard.writeText(hash)
      .then(() => addToast('Hash copied to clipboard', 'success'))
      .catch(() => addToast('Failed to copy hash', 'error'));
  };
  
  if (recentHashes.length === 0) {
    return null;
  }
  
  return (
    <div className="border border-gray-200 dark:border-gray-700 rounded-lg transition-all duration-300">
      <button
        onClick={toggleOpen}
        className="w-full p-4 flex justify-between items-center text-left"
      >
        <span className="font-medium">Recent Hashes ({recentHashes.length})</span>
        <div className="flex items-center space-x-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleClear();
            }}
            className="p-1 text-gray-500 hover:text-red-500 dark:text-gray-400 dark:hover:text-red-400 transition-colors"
            aria-label="Clear history"
          >
            <Trash2 size={16} />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              loadRecentHashes();
              addToast('Recent hashes refreshed', 'info');
            }}
            className="p-1 text-gray-500 hover:text-blue-500 dark:text-gray-400 dark:hover:text-blue-400 transition-colors"
            aria-label="Refresh history"
          >
            <RefreshCw size={16} />
          </button>
          <svg
            className={`w-4 h-4 text-gray-500 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </button>
      
      {isOpen && (
        <div className="border-t border-gray-200 dark:border-gray-700 p-4 animate-fadeIn">
          <div className="max-h-64 overflow-y-auto">
            {recentHashes.map((item) => (
              <div 
                key={item.id}
                className="border-b border-gray-200 dark:border-gray-700 last:border-0 py-3"
              >
                <div className="flex justify-between items-start mb-1">
                  <div className="font-medium truncate mr-2">{item.filename}</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    {formatFileSize(item.fileSize)}
                  </div>
                </div>
                
                <div className="flex items-center mb-1">
                  <div className="flex-1 font-mono text-xs bg-gray-50 dark:bg-gray-900 rounded p-1.5 truncate">
                    {item.hash}
                  </div>
                  <button
                    onClick={() => copyToClipboard(item.hash)}
                    className="ml-2 p-1 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
                    aria-label="Copy to clipboard"
                  >
                    <ClipboardCopy size={16} />
                  </button>
                </div>
                
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  {new Date(item.date).toLocaleString()}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default RecentHashes;