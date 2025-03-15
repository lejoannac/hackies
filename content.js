chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.isEnabled) {
    enableScrollToTop();
  } else {
    disableScrollToTop();
  }
});

function enableScrollToTop() {
  window.addEventListener("scroll", scrollToTop);
}

function disableScrollToTop() {
  window.removeEventListener("scroll", scrollToTop);
}

function scrollToTop() {
  window.scrollTo(0, 0);
}

// Add deletetab function
function deletetab() {
  if (window.name === '') {
    if (!sessionStorage.getItem('loadedBefore')) {
      sessionStorage.setItem('loadedBefore', 'true');
      window.name = 'myWinName';
    } else {
      alert("What?! One window not cool enough for ya?\nCalling the InterWeb Police!");
      chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        if (tabs.length > 0) {
          let tabId = tabs[0].id;
          chrome.tabs.remove(tabId, function () {
            if (chrome.runtime.lastError) {
              console.error("Error removing tab:", chrome.runtime.lastError);
            } else {
              console.log("Tab successfully removed");
            }
          });
        }
      });
    }
  } else if (window.name === 'myWinName') {
    document.title = 'All is well... we think';
  }
}