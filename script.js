document.addEventListener("DOMContentLoaded", function () {
  const toggleSwitch = document.getElementById("toggleSwitch");
  const timerDisplay = document.getElementById("timerDisplay");
  const timeInput = document.getElementById("timeInput");
  const startButton = document.getElementById("startButton");
  let timer;
  let timerValue = 5;
  let popupTimer;

  // Load saved state
  chrome.storage.local.get(["isEnabled", "timerValue"], function (result) {
    toggleSwitch.checked = result.isEnabled || false;
    timerValue = result.timerValue !== undefined ? result.timerValue : 5;
    updateTimerDisplay();

    if (toggleSwitch.checked) {
      enableScrollToTop();
    }
  });

  // Toggle event listener
  toggleSwitch.addEventListener("change", function () {
    let newState = toggleSwitch.checked;
    chrome.storage.local.set({ isEnabled: newState });

    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      if (tabs.length > 0) {
        chrome.tabs.sendMessage(tabs[0].id, { isEnabled: newState });
      }
    });

    if (newState) {
      enableScrollToTop();
    } else {
      disableScrollToTop();
    }
  });

  // Start button event listener
  startButton.addEventListener("click", function () {
    const inputMinutes = parseInt(timeInput.value, 10);
    if (!isNaN(inputMinutes) && inputMinutes > 0) {
      timerValue = inputMinutes * 60; // Convert minutes to seconds
      startTimer();
    }
  });

  function enableScrollToTop() {
    window.onscroll = function () {
      scrollTop();
    };
    startTimer();
  }

  function disableScrollToTop() {
    window.onscroll = null;
    stopTimer();
  }

  function scrollTop() {
    window.scrollTo(0, 0);
  }

  function startTimer() {
    stopTimer(); // Prevent multiple timers running at the same time
    updateTimerDisplay();
    timer = setInterval(function () {
      timerValue--;

      if (timerValue < 0) {
        playSound(); // Play sound when timer hits 0
        timerValue = 5; // Reset timer after playing sound
      }

      chrome.storage.local.set({ timerValue: timerValue });
      updateTimerDisplay();
    }, 1000);
  }

  function stopTimer() {
    clearInterval(timer);
    timerValue = 5;
    chrome.storage.local.set({ timerValue: timerValue });
    updateTimerDisplay();
  }

  function updateTimerDisplay() {
    if (timerDisplay) {
      const minutes = Math.floor(timerValue / 60);
      const seconds = timerValue % 60;
      timerDisplay.textContent = `Timer: ${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    }
  }

  function playSound() {
    const audio = new Audio(chrome.runtime.getURL("sound.mp3"));
    audio.play().catch(error => console.error("Audio playback failed:", error));
  }

  // Popup functionality
  function startPopupTimer() {
    stopPopupTimer(); // Prevent multiple popup timers running at the same time
    popupTimer = setInterval(showPopup, 15000);
  }

  function stopPopupTimer() {
    clearInterval(popupTimer);
  }

  function showPopup() {
    const popup = document.createElement("div");
    popup.textContent = "ERROR YOU ARE GETTING HACKED";
    popup.style.position = "fixed";
    popup.style.top = "50%";
    popup.style.left = "50%";
    popup.style.transform = "translate(-50%, -50%)";
    popup.style.backgroundColor = "red";
    popup.style.padding = "20px";
    popup.style.border = "1px solid black";
    popup.style.zIndex = "1000";
    document.body.appendChild(popup);

    const audio = new Audio(chrome.runtime.getURL("emergency-alarm-69780.mp3"));
    audio.play();

    setTimeout(() => {
      document.body.removeChild(popup);
    }, 5000); // Remove popup after 3 seconds
  }

  // Start the popup timer when the DOM is fully loaded
  startPopupTimer();

  // Add an event listener to the document to listen for keydown events
  document.addEventListener("keydown", function (event) {
    // Check if the pressed key is "b"
    if (event.key === "b") {
      // Redirect the current tab to the specified YouTube link
      window.location.href = "https://www.youtube.com/watch?v=dQw4w9WgXcQ";
    }
  });
});
