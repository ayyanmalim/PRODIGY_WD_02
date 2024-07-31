let timer;
let isRunning = false;
let startTime;
let elapsedTime = 0;
let laps = [];

const display = document.getElementById('display');
const startStopBtn = document.getElementById('startStopBtn');
const resetBtn = document.getElementById('resetBtn');
const lapBtn = document.getElementById('lapBtn');
const lapsList = document.getElementById('lapsList');

startStopBtn.addEventListener('click', function() {
    if (isRunning) {
        clearInterval(timer);
        isRunning = false;
        startStopBtn.textContent = 'Start';
    } else {
        startTime = Date.now() - elapsedTime;
        timer = setInterval(updateTime, 1000);
        isRunning = true;
        startStopBtn.textContent = 'Pause';
    }
});

resetBtn.addEventListener('click', function() {
    clearInterval(timer);
    isRunning = false;
    elapsedTime = 0;
    laps = [];
    display.textContent = '00:00:00';
    startStopBtn.textContent = 'Start';
    lapsList.innerHTML = '';
});

lapBtn.addEventListener('click', function() {
    if (isRunning) {
        const lapTime = formatTime(elapsedTime);
        laps.push(lapTime);
        const li = document.createElement('li');
        li.textContent = lapTime;
        lapsList.appendChild(li);
    }
});

function updateTime() {
    elapsedTime = Date.now() - startTime;
    display.textContent = formatTime(elapsedTime);
}

function formatTime(ms) {
    const totalSeconds = Math.floor(ms / 1000);
    const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, '0');
    const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, '0');
    const seconds = String(totalSeconds % 60).padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
}
