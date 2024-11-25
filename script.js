let elapsedTime = 0; // Time elapsed in milliseconds
let isRunning = false;
let startTime;
let interval;
let pausedTime = 0;
let lapCount = 1;
let lastPausedTime = 0; // To track total paused time
let lapTimes = []; // Array to store lap times
const tickSound = new Audio("small-clock-fast-tick-tock-48369.mp3"); // Load ticking sound

// Start the stopwatch
function startStopwatch() {
  if (!isRunning) {
    isRunning = true;
    startTime = Date.now() - pausedTime;
    interval = setInterval(updateTime, 1000); // Update every second

    // Start ticking sound and loop it
    tickSound.play();
    tickSound.loop = true;

    // Change timer dial background to grey
    document.querySelector(".timer-dial").style.background = "grey";

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
    pausedTime = Date.now() - startTime + lastPausedTime;

    // Update the paused time display
    document.getElementById("paused-time").textContent = formatTime(pausedTime);

    // Pause ticking sound
    tickSound.pause();

    // Change timer dial background to white
    document.querySelector(".timer-dial").style.background = "white";

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
  lastPausedTime = 0;
  lapCount = 1;
  lapTimes = [];

  // Stop ticking sound and reset it to the start
  tickSound.pause();
  tickSound.currentTime = 0;

  // Reset timer dial background to white
  document.querySelector(".timer-dial").style.background = "white";

  document.getElementById("time").textContent = "00:00:00";
  document.getElementById("paused-time").textContent = "00:00:00";
  document.getElementById("lap-times").innerHTML = ""; // Clear lap records
  document.getElementById("start").disabled = false;
  document.getElementById("pause").disabled = true;
  document.getElementById("reset").disabled = true;
}

// Update the timer every second
function updateTime() {
  elapsedTime = Date.now() - startTime;
  document.getElementById("time").textContent = formatTime(elapsedTime);
}

// Format time in hh:mm:ss format
function formatTime(ms) {
  const hours = Math.floor(ms / 3600000);
  const minutes = Math.floor((ms % 3600000) / 60000);
  const seconds = Math.floor((ms % 60000) / 1000);
  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
    2,
    "0"
  )}:${String(seconds).padStart(2, "0")}`;
}

// Record a lap time
function recordLap() {
  if (isRunning) {
    const currentLapTime = elapsedTime;
    const lapDifference =
      lapTimes.length > 0
        ? currentLapTime - lapTimes[lapTimes.length - 1]
        : currentLapTime;

    lapTimes.push(currentLapTime);

    const lapItem = document.createElement("li");
    lapItem.textContent = `Lap ${lapCount}: ${formatTime(currentLapTime)} (+${
      lapTimes.length > 1 ? formatTime(lapDifference) : "00:00:00"
    })`;
    document.getElementById("lap-times").appendChild(lapItem);

    lapCount++;
  }
}

// Set a custom time
function setCustomTime() {
  const customTimeInput = document.getElementById("custom-time").value;

  if (customTimeInput && !isRunning) {
    const customDuration = parseInt(customTimeInput, 10) * 1000; // Convert seconds to milliseconds

    if (customDuration > 0) {
      elapsedTime = customDuration;
      pausedTime = customDuration; // Update pausedTime
      document.getElementById("time").textContent = formatTime(customDuration);
    } else {
      alert("Please enter a positive number.");
    }
  } else if (isRunning) {
    alert("Pause the stopwatch before setting a custom time.");
  } else {
    alert("Please enter a valid number.");
  }
}

// Event listeners
document.getElementById("start").addEventListener("click", startStopwatch);
document.getElementById("pause").addEventListener("click", pauseStopwatch);
document.getElementById("reset").addEventListener("click", resetStopwatch);
document.getElementById("lap").addEventListener("click", recordLap);
document.getElementById("setTime").addEventListener("click", setCustomTime);
