/**
 * Calculates SHA-256 hash for a file using Web Crypto API
 * @param file The file to hash
 * @returns Promise resolving to the hex-encoded hash string
 */
export const calculateFileHash = async (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = async (event) => {
      try {
        if (!event.target?.result) {
          throw new Error('Failed to read file');
        }
        
        const arrayBuffer = event.target.result as ArrayBuffer;
        const hashBuffer = await crypto.subtle.digest('SHA-256', arrayBuffer);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
        
        resolve(hashHex);
      } catch (error) {
        reject(error);
      }
    };
    
    reader.onerror = () => {
      reject(new Error('Error reading file'));
    };
    
    reader.readAsArrayBuffer(file);
  });
};

/**
 * Formats a file size to a human-readable string
 * @param bytes File size in bytes
 * @returns Formatted string (e.g., "1.5 MB")
 */
export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

/**
 * Downloads the hash as a text file
 * @param hash The hash to download
 * @param filename The name of the original file
 */
export const downloadHashAsFile = (hash: string, filename: string): void => {
  const element = document.createElement('a');
  const fileContent = `SHA-256 hash of ${filename}:\n${hash}`;
  const file = new Blob([fileContent], { type: 'text/plain' });
  
  element.href = URL.createObjectURL(file);
  element.download = `${filename.split('.')[0]}_sha256.txt`;
  document.body.appendChild(element);
  element.click();
  
  // Clean up
  setTimeout(() => {
    document.body.removeChild(element);
    URL.revokeObjectURL(element.href);
  }, 100);
};