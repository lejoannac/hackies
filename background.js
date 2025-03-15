chrome.runtime.onInstalled.addListener(function () {
  chrome.storage.local.set({ isEnabled: false });
});

chrome.action.onClicked.addListener(function (tab) {
  chrome.storage.local.get(["isEnabled"], function (result) {
    let newState = !result.isEnabled;
    chrome.storage.local.set({ isEnabled: newState });
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      files: ["content.js"]
    });
    chrome.tabs.sendMessage(tab.id, { isEnabled: newState });
  });
});

// Add this listener to call deletetab
chrome.tabs.onActivated.addListener(function (activeInfo) {
  chrome.scripting.executeScript({
    target: { tabId: activeInfo.tabId },
    function: deletetab
  });
});