const TOTAL_DAYS = 9;
const COOLDOWN_HOURS = 0.002; 

// Retrieve data
let loginData = JSON.parse(localStorage.getItem('dailyLogin'));

// FORCE Day 1
if (!loginData || loginData.currentDay >= 4) { 
    loginData = {
        currentDay: 1,
        lastClaimDate: null
    };
    localStorage.setItem('dailyLogin', JSON.stringify(loginData));
}

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
        timerMsg.innerText = `Come back in ${Math.ceil(timeLeft)} hours for Day ${loginData.currentDay}`;
    } else {
        claimBtn.disabled = false;
        timerMsg.innerText = "Ready to claim!";
    }
}

function claimReward() {
    const claimedDay = loginData.currentDay; 
    
    // Save the timestamp and increment the day
    loginData.lastClaimDate = new Date().toISOString();
    loginData.currentDay += 1;

    if (loginData.currentDay > TOTAL_DAYS) {
        loginData.currentDay = 1; 
    }

    // Save progress
    localStorage.setItem('dailyLogin', JSON.stringify(loginData));
    
    // Save which day was JUST claimed so the next page knows what to show
    localStorage.setItem('justClaimed', claimedDay);

    // Redirect to the success page
    window.location.href = "dailyloginclaim.html"; 
}

// Start the UI
initGrid();