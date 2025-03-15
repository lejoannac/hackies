document.addEventListener("DOMContentLoaded", function() {
    var btn5 = document.getElementById("btn5");
    btn5.addEventListener("click", function() {
        chrome.tabs.create({ url: "https://www.youtube.com/watch?v=DSG53BsUYd0" });
    });
});