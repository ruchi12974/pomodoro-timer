
 const timerDisplay = document.getElementById('timer');
const startBtn = document.getElementById('start');
const stopBtn = document.getElementById('stop');
const resetBtn = document.getElementById('reset');
const shortBreakBtn = document.getElementById('shortBreak');
const longBreakBtn = document.getElementById('longBreak');
const alertSound = document.getElementById('alert-sound');

let timerDuration = 25 * 60;
let remainingTime = timerDuration;
let timerInterval = null;
let isRunning = false;

function updateDisplay(seconds) {
  const hrs = String(Math.floor(seconds / 3600)).padStart(2, '0');
  const mins = String(Math.floor((seconds % 3600) / 60)).padStart(2, '0');
  const secs = String(seconds % 60).padStart(2, '0');
  timerDisplay.textContent = `${hrs !== '00' ? hrs + ':' : ''}${mins}:${secs}`;
}

function startTimer() {
  if (isRunning) return;
  isRunning = true;
  timerInterval = setInterval(() => {
    if (remainingTime <= 0) {
      clearInterval(timerInterval);
      alertSound.play();
      isRunning = false;
      return;
    }
    remainingTime--;
    updateDisplay(remainingTime);
  }, 1000);
}

function stopTimer() {
  clearInterval(timerInterval);
  isRunning = false;
}

function resetTimer() {
  stopTimer();
  remainingTime = timerDuration;
  updateDisplay(remainingTime);
}

function setMode(seconds) {
  stopTimer();
  timerDuration = seconds;
  remainingTime = seconds;
  updateDisplay(remainingTime);
}

startBtn.addEventListener('click', startTimer);
stopBtn.addEventListener('click', stopTimer);
resetBtn.addEventListener('click', resetTimer);
shortBreakBtn.addEventListener('click', () => setMode(5 * 60));
longBreakBtn.addEventListener('click', () => setMode(15 * 60));

// Default view
updateDisplay(remainingTime);
