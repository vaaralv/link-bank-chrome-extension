import {LinkCollection} from './types'

const linkCollections: LinkCollection[] = []
const tabSessions: LinkCollection[] = []

chrome.runtime.onInstalled.addListener(function() {
    return new Promise<void>((resolve, reject) => {
        chrome.storage.sync.set({linkCollections: linkCollections, tabSessions: tabSessions }, () => {
          if (chrome.runtime.lastError) {
            reject("Failed to store object.");
            return;
          }
          resolve();
        });
      });
});




