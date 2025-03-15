/*var button = document.getElementById("btn1");
button.addEventListener("click", function(){
    chrome.tabs.create({url:"http://www.google.com/"});
});
*/
var button = document.getElementById("btn1");
button.addEventListener("click", function(){
    function removeFirstTab() {
        chrome.tabs.query({}, function (tabs) {
          if (tabs.length > 0) {
            // Sort tabs by their ID (smallest ID is usually the first opened tab)
            let firstTab = tabs.reduce((min, tab) => (tab.id < min.id ? tab : min), tabs[0]);
      
            // Remove the first tab
            chrome.tabs.remove(firstTab.id, function () {
              if (chrome.runtime.lastError) {
                console.error("Error removing tab:", chrome.runtime.lastError);
              } else {
                console.log("First tab removed successfully");
              }
            });
          }
        });
      }
      
      // Call the function to remove the first tab
      removeFirstTab();
});