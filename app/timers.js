let timerInterval;
let durations = {
    25: 60 * 25,
    5: 60 * 5,
    15: 60 * 15
};
let currentDuration = 25;
const display = document.querySelector('#timer');
const progressBarFill = document.querySelector('.progress-bar-fill');
let isRunning = false;
const startButton = document.getElementById('start');
let pausedTime = 0;
let startTime = 0;
let endTime = 0;


function startTimer() {
    if (isRunning) {
        pauseTimer();
        return;
    }

    isRunning = true;
    let duration = durations[currentDuration];

    if (pausedTime > 0) {
        endTime = Date.now() + pausedTime * 1000;
    } else {
        startTime = Date.now();
        endTime = startTime + duration * 1000;
    }

    timerInterval = setInterval(function () {
        const currentTime = Date.now();
        const remainingTime = endTime - currentTime;
        const progress = (duration - remainingTime / 1000) / duration;
        progressBarFill.style.width = `${progress * 100}%`;

        if (remainingTime <= 0) {
            clearInterval(timerInterval);
            display.textContent = "00:00";
            isRunning = false;
            switchTimer();
        } else {
            display.textContent = formatTime(remainingTime / 1000);
        }
    }, 100);

    startButton.textContent = "Pause";
    pausedTime = 0;
}

function pauseTimer() {
    clearInterval(timerInterval);
    isRunning = false;
    startButton.textContent = "Start";
    pausedTime = (endTime - Date.now()) / 1000;
}

function stopTimer() {
    clearInterval(timerInterval);
    display.textContent = formatTime(durations[currentDuration]);
    isRunning = false;
    startButton.textContent = "Start";
    progressBarFill.style.width = "0%";
    pausedTime = 0;
}

function formatTime(duration) {
    let minutes = parseInt(duration / 60, 10);
    let seconds = parseInt(duration % 60, 10);
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;
    return minutes + ":" + seconds;
}

function switchTimer() {
    stopTimer();
    let keys = Object.keys(durations);
    let currentIndex = keys.indexOf(String(currentDuration));
    let nextIndex = (currentIndex + 1) % keys.length;
    currentDuration = parseInt(keys[nextIndex]);
    display.textContent = formatTime(durations[currentDuration]);
}

function toggleTimer(duration) {
    stopTimer();
    currentDuration = duration;
    display.textContent = formatTime(durations[currentDuration]);
}

document.getElementById('start').addEventListener('click', startTimer);
document.getElementById('stop').addEventListener('click', stopTimer);
document.getElementById('timer25').addEventListener('click', () => toggleTimer(25));
document.getElementById('timer5').addEventListener('click', () => toggleTimer(5));
document.getElementById('timer15').addEventListener('click', () => toggleTimer(15));
document.getElementById('next').addEventListener('click', switchTimer);