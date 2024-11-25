let elapsedTime = 0;
let isRunning = false;
let startTime;
let interval;
let pausedTime = 0;
let lapCount = 1;
let tickSound = new Audio("small-clock-fast-tick-tock-48369.mp3"); // Load ticking sound

// Start the stopwatch
function startStopwatch() {
  if (!isRunning) {
    isRunning = true;
    startTime = Date.now() - pausedTime;
    interval = setInterval(updateTime, 1000); // Update every second

    // Change the dial to grey when running
    const timerDial = document.querySelector(".timer-dial");
    timerDial.style.background = "grey";

    tickSound.play(); // Start ticking sound
    document.getElementById("start").disabled = true;
    document.getElementById("pause").disabled = false;
    document.getElementById("reset").disabled = false;
  }
}

// Pause the stopwatch
function pauseStopwatch() {
  if (isRunning) {
    clearInterval(interval);
    isRunning = false;
    pausedTime = Date.now() - startTime;

    // Reset the dial color to white when paused
    const timerDial = document.querySelector(".timer-dial");
    timerDial.style.background = "white";

    tickSound.pause(); // Pause ticking sound
    tickSound.currentTime = 0; // Reset sound to start
    document.getElementById("start").disabled = false;
    document.getElementById("pause").disabled = true;
  }
}

// Reset the stopwatch
function resetStopwatch() {
  clearInterval(interval);
  isRunning = false;
  elapsedTime = 0;
  pausedTime = 0;

  // Reset dial color to white
  const timerDial = document.querySelector(".timer-dial");
  timerDial.style.background = "white";

  document.getElementById("time").textContent = "00:00:00";
  tickSound.pause(); // Pause ticking sound
  tickSound.currentTime = 0; // Reset sound to start
  document.getElementById("start").disabled = false;
  document.getElementById("pause").disabled = true;
  document.getElementById("reset").disabled = true;
}

// Update time every second
function updateTime() {
  elapsedTime = Date.now() - startTime;
  document.getElementById("time").textContent = formatTime(elapsedTime);

  // No conic-gradient applied here. Dial remains static grey while running.
}

// Format the time (milliseconds to mm:ss)
function formatTime(ms) {
  const minutes = Math.floor(ms / 60000);
  const seconds = Math.floor((ms % 60000) / 1000);
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
    2,
    "0"
  )}`;
}

// Event listeners for buttons
document.getElementById("start").addEventListener("click", startStopwatch);
document.getElementById("pause").addEventListener("click", pauseStopwatch);
document.getElementById("reset").addEventListener("click", resetStopwatch);
