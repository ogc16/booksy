
/**
 * Database Integration Module
 * 
 * This module provides functions for data persistence through IndexedDB.
 * In a production environment, this would be replaced with a proper backend database
 * like MongoDB, PostgreSQL, or Firebase.
 */

// Define database name and version
const DB_NAME = 'inventorySystemDB';
const DB_VERSION = 1;

// Initialize the database
export const initDatabase = (): Promise<IDBDatabase> => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);
    
    // Handle database upgrade (creating stores)
    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      
      // Create object stores if they don't exist
      if (!db.objectStoreNames.contains('inventory')) {
        const inventoryStore = db.createObjectStore('inventory', { keyPath: 'id' });
        inventoryStore.createIndex('sku', 'sku', { unique: true });
        inventoryStore.createIndex('name', 'name', { unique: false });
      }
      
      if (!db.objectStoreNames.contains('orders')) {
        const ordersStore = db.createObjectStore('orders', { keyPath: 'id' });
        ordersStore.createIndex('status', 'status', { unique: false });
        ordersStore.createIndex('customer', 'customer', { unique: false });
      }
      
      if (!db.objectStoreNames.contains('suppliers')) {
        const suppliersStore = db.createObjectStore('suppliers', { keyPath: 'id' });
        suppliersStore.createIndex('name', 'name', { unique: true });
        suppliersStore.createIndex('status', 'status', { unique: false });
      }

      if (!db.objectStoreNames.contains('purchaseOrders')) {
        const poStore = db.createObjectStore('purchaseOrders', { keyPath: 'id' });
        poStore.createIndex('supplier', 'supplier', { unique: false });
        poStore.createIndex('status', 'status', { unique: false });
      }
    };
    
    request.onsuccess = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      resolve(db);
    };
    
    request.onerror = (event) => {
      reject(`Database error: ${(event.target as IDBOpenDBRequest).error}`);
    };
  });
};

// Generic function to add an item to a store
export const addItem = <T>(storeName: string, item: T): Promise<T> => {
  return new Promise((resolve, reject) => {
    initDatabase().then(db => {
      const transaction = db.transaction(storeName, 'readwrite');
      const store = transaction.objectStore(storeName);
      const request = store.add(item);
      
      request.onsuccess = () => {
        resolve(item);
      };
      
      request.onerror = (event) => {
        reject(`Error adding item to ${storeName}: ${(event.target as IDBRequest).error}`);
      };
    }).catch(reject);
  });
};

// Generic function to get all items from a store
export const getAllItems = <T>(storeName: string): Promise<T[]> => {
  return new Promise((resolve, reject) => {
    initDatabase().then(db => {
      const transaction = db.transaction(storeName, 'readonly');
      const store = transaction.objectStore(storeName);
      const request = store.getAll();
      
      request.onsuccess = (event) => {
        resolve((event.target as IDBRequest).result as T[]);
      };
      
      request.onerror = (event) => {
        reject(`Error getting items from ${storeName}: ${(event.target as IDBRequest).error}`);
      };
    }).catch(reject);
  });
};

// Generic function to update an item in a store
export const updateItem = <T>(storeName: string, item: T): Promise<T> => {
  return new Promise((resolve, reject) => {
    initDatabase().then(db => {
      const transaction = db.transaction(storeName, 'readwrite');
      const store = transaction.objectStore(storeName);
      const request = store.put(item);
      
      request.onsuccess = () => {
        resolve(item);
      };
      
      request.onerror = (event) => {
        reject(`Error updating item in ${storeName}: ${(event.target as IDBRequest).error}`);
      };
    }).catch(reject);
  });
};

// Generic function to delete an item from a store
export const deleteItem = (storeName: string, id: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    initDatabase().then(db => {
      const transaction = db.transaction(storeName, 'readwrite');
      const store = transaction.objectStore(storeName);
      const request = store.delete(id);
      
      request.onsuccess = () => {
        resolve();
      };
      
      request.onerror = (event) => {
        reject(`Error deleting item from ${storeName}: ${(event.target as IDBRequest).error}`);
      };
    }).catch(reject);
  });
};

// Generic function to get an item by ID
export const getItemById = <T>(storeName: string, id: string): Promise<T | null> => {
  return new Promise((resolve, reject) => {
    initDatabase().then(db => {
      const transaction = db.transaction(storeName, 'readonly');
      const store = transaction.objectStore(storeName);
      const request = store.get(id);
      
      request.onsuccess = (event) => {
        resolve((event.target as IDBRequest).result as T || null);
      };
      
      request.onerror = (event) => {
        reject(`Error getting item from ${storeName}: ${(event.target as IDBRequest).error}`);
      };
    }).catch(reject);
  });
};

// Generic function to query items by an index
export const queryItemsByIndex = <T>(
  storeName: string, 
  indexName: string, 
  value: any
): Promise<T[]> => {
  return new Promise((resolve, reject) => {
    initDatabase().then(db => {
      const transaction = db.transaction(storeName, 'readonly');
      const store = transaction.objectStore(storeName);
      const index = store.index(indexName);
      const request = index.getAll(value);
      
      request.onsuccess = (event) => {
        resolve((event.target as IDBRequest).result as T[]);
      };
      
      request.onerror = (event) => {
        reject(`Error querying items from ${storeName}: ${(event.target as IDBRequest).error}`);
      };
    }).catch(reject);
  });
};

// Clear all data (for testing purposes)
export const clearDatabase = (): Promise<void> => {
  return new Promise((resolve, reject) => {
    initDatabase().then(db => {
      const storeNames = Array.from(db.objectStoreNames);
      const transaction = db.transaction(storeNames, 'readwrite');
      
      let completed = 0;
      
      storeNames.forEach(storeName => {
        const store = transaction.objectStore(storeName);
        const request = store.clear();
        
        request.onsuccess = () => {
          completed++;
          if (completed === storeNames.length) {
            resolve();
          }
        };
        
        request.onerror = (event) => {
          reject(`Error clearing ${storeName}: ${(event.target as IDBRequest).error}`);
        };
      });
    }).catch(reject);
  });
};
