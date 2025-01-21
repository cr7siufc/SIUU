let siuuCount = 0;
let farmCooldown = 5; // Cooldown in seconds
let currentTime = farmCooldown;

document.getElementById('siuuCount').textContent = siuuCount;

// Farm SIUU function
function farmSiuu() {
    if (currentTime === 0) {
        siuuCount += Math.floor(Math.random() * 10) + 1; // Random amount of SIUU
        document.getElementById('siuuCount').textContent = siuuCount;
        resetTimer();
    }
}

// Reset the farming timer
function resetTimer() {
    currentTime = farmCooldown;
    updateTimerDisplay();
    const interval = setInterval(() => {
        if (currentTime > 0) {
            currentTime--;
            updateTimerDisplay();
        } else {
            clearInterval(interval);
        }
    }, 1000);
}

// Update the timer display
function updateTimerDisplay() {
    document.getElementById('timer').textContent = currentTime;
}

// Slut Machine Spin
function spinSlutMachine() {
    if (siuuCount >= 10) { // Cost to spin
        siuuCount -= 10;
        document.getElementById('siuuCount').textContent = siuuCount;
        const result = Math.random() < 0.05 ? "Jackpot!" : "Try Again"; // 5% chance for jackpot
        document.getElementById('jackpotResult').textContent = result;
    } else {
        alert("Not enough SIUU to spin!");
    }
}

// Event listeners
document.getElementById('farmButton').addEventListener('click', farmSiuu);
document.getElementById('spinButton').addEventListener('click', spinSlutMachine);

// Initial timer setup
resetTimer();