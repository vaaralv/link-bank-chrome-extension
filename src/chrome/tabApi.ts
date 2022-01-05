interface TabData {
    windowId: number;
    tabId: number;
  }

export const activateTab = ({ windowId, tabId }: TabData) => {
    chrome.windows.update(windowId, { focused: true });
    chrome.tabs.update(tabId, {
      active: true,
      highlighted: true,
    });
  }


export const createWindow = (urls: string[]) => {
    var createData = {
      url: urls,
      focused: true,
      type: "normal",
    };
    return new Promise<void>((resolve, reject) => {
      chrome.windows.create(createData, function () {
        if (chrome.runtime.lastError) {
          reject("Failed to create window.");
          return;
        }
        resolve();
      });
    });
  }
  
  export const createTab = (url: string) => {
    chrome.tabs.create({ url });
  }