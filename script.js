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
  const percentage = (elapsedTime / 1000) * 360; // Update the dial's progress
  document.querySelector(
    ".timer-dial"
  ).style.background = `conic-gradient(blue ${percentage}deg, #f1f1f1 0deg)`;
}

// Format the time (milliseconds to mm:ss:SSS)
function formatTime(ms) {
  const date = new Date(ms);
  return date.toISOString().substr(14, 5); // "mm:ss"
}

// Record lap time
function recordLap() {
  if (isRunning) {
    const lapTime = formatTime(elapsedTime + pausedTime);
    const lapItem = document.createElement("li");
    lapItem.textContent = `Lap ${lapCount}: ${lapTime}`;
    document.getElementById("lap-times").appendChild(lapItem);
    lapCount++;
  }
}

// Set custom time
function setCustomTime() {
  const customDuration =
    parseInt(document.getElementById("custom-time").value) * 1000; // Convert to milliseconds
  if (customDuration > 0) {
    elapsedTime = customDuration;
    document.getElementById("time").textContent = formatTime(elapsedTime);
  }
}

// Event listeners
document.getElementById("start").addEventListener("click", startStopwatch);
document.getElementById("pause").addEventListener("click", pauseStopwatch);
document.getElementById("reset").addEventListener("click", resetStopwatch);
document.getElementById("lap").addEventListener("click", recordLap);
document.getElementById("setTime").addEventListener("click", setCustomTime);
