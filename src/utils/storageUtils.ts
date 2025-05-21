// Maximum number of hashes to store
const MAX_STORED_HASHES = 5;

export interface StoredHash {
  id: string;
  filename: string;
  hash: string;
  fileSize: number;
  date: string;
}

/**
 * Gets recent hashes from localStorage
 * @returns Array of stored hashes
 */
export const getRecentHashes = (): StoredHash[] => {
  try {
    const storedData = localStorage.getItem('recentHashes');
    if (!storedData) return [];
    return JSON.parse(storedData) as StoredHash[];
  } catch (error) {
    console.error('Error retrieving hashes from localStorage:', error);
    return [];
  }
};

/**
 * Adds a new hash to localStorage
 * @param hash Hash object to store
 */
export const addRecentHash = (hash: Omit<StoredHash, 'id' | 'date'>): void => {
  try {
    const recentHashes = getRecentHashes();
    
    // Create new hash object with ID and date
    const newHash: StoredHash = {
      ...hash,
      id: Math.random().toString(36).substring(2, 9),
      date: new Date().toISOString()
    };
    
    // Add to beginning of array and limit to MAX_STORED_HASHES
    const updatedHashes = [newHash, ...recentHashes].slice(0, MAX_STORED_HASHES);
    
    localStorage.setItem('recentHashes', JSON.stringify(updatedHashes));
  } catch (error) {
    console.error('Error storing hash in localStorage:', error);
  }
};

/**
 * Clear all stored hashes
 */
export const clearRecentHashes = (): void => {
  try {
    localStorage.removeItem('recentHashes');
  } catch (error) {
    console.error('Error clearing hashes from localStorage:', error);
  }
};