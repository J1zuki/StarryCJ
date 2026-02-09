const TOTAL_DAYS = 9;
const COOLDOWN_HOURS = 0.001; 

// 1. Try to get data from the current SESSION
let loginData = JSON.parse(sessionStorage.getItem('dailyLogin'));

// 2. If it's a brand new session (just opened the code), loginData will be null
if (!loginData) {
    loginData = {
        currentDay: 1,
        lastClaimDate: null
    };
    // Save it to the session so progress stays while the tab is open
    sessionStorage.setItem('dailyLogin', JSON.stringify(loginData));
}

// Save it back immediately so the rest of the functions see Day 1
localStorage.setItem('dailyLogin', JSON.stringify(loginData));

function initGrid() {
    const grid = document.getElementById('rewards-grid');
    const claimBtn = document.getElementById('claim-btn');
    const timerMsg = document.getElementById('timer-msg');
    grid.innerHTML = '';

    const now = new Date().getTime();
    const lastClaim = loginData.lastClaimDate ? new Date(loginData.lastClaimDate).getTime() : 0;
    const hoursPassed = (now - lastClaim) / (1000 * 60 * 60);
    
    // Determine if the user can claim today
    const canClaim = hoursPassed >= COOLDOWN_HOURS || loginData.lastClaimDate === null;

    for (let i = 1; i <= TOTAL_DAYS; i++) {
        const dayBox = document.createElement('div');
        dayBox.className = 'day-box';
        
        if (i < loginData.currentDay) {
            dayBox.classList.add('claimed');
        } else if (i === loginData.currentDay && canClaim) {
            dayBox.classList.add('active');
        }

        dayBox.innerHTML = `
            <div class="day-label">Day ${i}</div>
            <div class="gem-tag">2 Gems 💎</div>
        `;
        grid.appendChild(dayBox);
    }

    if (!canClaim) {
        claimBtn.disabled = true;
        const timeLeft = COOLDOWN_HOURS - hoursPassed;
        timerMsg.innerText = `Come back in next day to claim your reward!`;
    } else {
        claimBtn.disabled = false;
        timerMsg.innerText = "Ready to claim!";
    }
}

function claimReward() {
    const claimedDay = loginData.currentDay; 
    
    loginData.lastClaimDate = new Date().toISOString();
    loginData.currentDay += 1;

    if (loginData.currentDay > TOTAL_DAYS) {
        loginData.currentDay = 1; 
    }

    // 3. IMPORTANT: Update sessionStorage, not localStorage
    sessionStorage.setItem('dailyLogin', JSON.stringify(loginData));
    localStorage.setItem('justClaimed', claimedDay); // Success page can still use localStorage

    window.location.href = "dailyloginclaim.html"; 
}

initGrid()