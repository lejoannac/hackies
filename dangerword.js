// Add an event listener to the document to listen for keydown events
document.addEventListener("keydown", function (event) {
    // Check if the pressed key is "b"
    if (event.key === "b") {
        // Redirect the current tab to the specified YouTube link
        window.location.href = "https://www.youtube.com/watch?v=dQw4w9WgXcQ";
    }
});