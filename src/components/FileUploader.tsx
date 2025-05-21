import React, { useCallback, useState } from 'react';
import { Upload, Trash2, FileText } from 'lucide-react';
import { formatFileSize } from '../utils/hashUtils';
import { useToast } from '../context/ToastContext';

interface FileUploaderProps {
  onFileSelected: (file: File) => void;
  selectedFile: File | null;
  onClearFile: () => void;
  maxSize?: number; // in MB
  accept?: string;
}

const FileUploader: React.FC<FileUploaderProps> = ({
  onFileSelected,
  selectedFile,
  onClearFile,
  maxSize = 100, // Default 100MB
  accept = '*'
}) => {
  const { addToast } = useToast();
  const [isDragging, setIsDragging] = useState(false);
  
  const handleDragEnter = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);
  
  const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);
  
  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);
  
  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    
    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      validateAndProcessFile(files[0]);
    }
  }, []);
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      validateAndProcessFile(files[0]);
    }
  };
  
  const validateAndProcessFile = (file: File) => {
    // Check file size
    if (file.size > maxSize * 1024 * 1024) {
      addToast(`File size exceeds the maximum limit of ${maxSize}MB`, 'error');
      return;
    }
    
    onFileSelected(file);
    addToast('File uploaded successfully', 'success');
  };
  
  return (
    <div className="mb-6">
      {selectedFile ? (
        <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 bg-white dark:bg-gray-800">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-medium text-lg">Selected File</h3>
            <button
              onClick={onClearFile}
              className="text-red-500 hover:text-red-700 dark:hover:text-red-400 transition-colors p-1"
              aria-label="Remove file"
            >
              <Trash2 size={18} />
            </button>
          </div>
          
          <div className="flex items-center">
            <div className="flex-shrink-0 bg-blue-100 dark:bg-blue-900/30 p-3 rounded-lg">
              <FileText className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div className="ml-4">
              <p className="font-medium text-gray-900 dark:text-gray-100">{selectedFile.name}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">{formatFileSize(selectedFile.size)}</p>
            </div>
          </div>
        </div>
      ) : (
        <div
          className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
            isDragging
              ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
              : 'border-gray-300 dark:border-gray-700 hover:border-gray-400 dark:hover:border-gray-600'
          }`}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          <div className="mx-auto flex justify-center mb-4 text-gray-400 dark:text-gray-500">
            <Upload size={36} />
          </div>
          <p className="mb-2 font-medium text-gray-700 dark:text-gray-300">
            Drag and drop your file here, or
          </p>
          <label className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors cursor-pointer">
            <span>Browse files</span>
            <input
              type="file"
              className="hidden"
              onChange={handleFileChange}
              accept={accept}
            />
          </label>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            Maximum file size: {maxSize}MB
          </p>
        </div>
      )}
    </div>
  );
};

export default FileUploader;