import {LinkCollection} from './types'

const linkCollections: LinkCollection[] = []

chrome.runtime.onInstalled.addListener(function() {
    return new Promise((resolve, reject) => {
        chrome.storage.sync.set({linkCollections: linkCollections }, () => {
          if (chrome.runtime.lastError) {
            reject("Failed to store object.");
            return;
          }
          resolve();
        });
      });
});




