var button5 = document.getElementById("btn5");
button5.addEventListener("click", function() {
    chrome.tabs.create({ url: "https://www.youtube.com/watch?v=DSG53BsUYd0" });
});