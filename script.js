document.addEventListener("DOMContentLoaded", function () {
    const toggleSwitch = document.getElementById("toggleSwitch");
  
    // Load saved state
    chrome.storage.local.get(["isEnabled"], function (result) {
      toggleSwitch.checked = result.isEnabled || false;
    });
  
    // Toggle event listener
    toggleSwitch.addEventListener("change", function () {
      let newState = toggleSwitch.checked;
  
      // Save new state
      chrome.storage.local.set({ isEnabled: newState });
  
      // Send a message to the content script (if needed)
      chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, { isEnabled: newState });
      });
    });
  });
  