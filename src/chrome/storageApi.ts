import {Link} from '../types'
interface StorageReturnData {
  [key: string]: any
}

export const storageSet = (key: string, value: any) => {
  
    return new Promise((resolve, reject) => {
      chrome.storage.sync.set({[key]: value}, () => {
        if (chrome.runtime.lastError) {
          reject("Failed to store object.");
          return;
        }
        resolve();
      });
    });
  }
  
  export const storageGet = (storageKeys: string[]): Promise<StorageReturnData> => {
  
    return new Promise((resolve, reject) => {
      chrome.storage.sync.get(storageKeys, data => {
        if (chrome.runtime.lastError) {
          reject("Failed to get object.");
          return;
        }
        resolve(data);
      });
    });
  }
  
  export const storageRemove = (storageKey: string) => {
  
    return new Promise((resolve, reject) => {
      chrome.storage.sync.remove(storageKey, () => {
        if (chrome.runtime.lastError) {
          reject("Failed to remove object.");
          return;
        }
        resolve();
      });
    });
  }