function claimReward() {
    // 1. Save the claim
    const claimedDay = loginData.currentDay; // Store current day before incrementing
    loginData.lastClaimDate = new Date().toISOString();
    loginData.currentDay += 1;

    if (loginData.currentDay > TOTAL_DAYS) {
        loginData.currentDay = 1; 
    }

    localStorage.setItem('dailyLogin', JSON.stringify(loginData));

    // 2. Update the Grid
    initGrid();

    // 3. Show the Success Modal
    showSuccessModal(claimedDay);
}

function closeModal() {
    // Hide the modal (optional if navigating away immediately)
    document.getElementById('success-modal').style.display = 'none';
    
    // Redirect to the login page
    window.location.href = "dailylogin.html";
}

// Ensure the show function works
function showSuccessModal(dayNumber) {
    const modal = document.getElementById('success-modal');
    const dayText = document.getElementById('modal-day-text');
    
    if(dayText) dayText.innerText = `Day ${dayNumber}`;
    if(modal) modal.style.display = 'flex';
}