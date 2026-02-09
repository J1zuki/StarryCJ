// Persistent: Check if they already claimed the bonus
let hasClaimedBonus = localStorage.getItem('hasClaimedShareBonus') === 'true';

function grantExtraChance() {
    // 1. Check if they already used their one-time bonus
    if (hasClaimedBonus) {
        alert("You've already used your one-time share bonus!");
        return;
    }

    // 2. Grant the chance
    let currentChances = parseInt(localStorage.getItem('drawChances')) || 0;
    currentChances += 1;
    
    // 3. Save to storage
    localStorage.setItem('drawChances', currentChances);
    localStorage.setItem('hasClaimedShareBonus', 'true'); // Mark as used forever
    localStorage.removeItem('isGameOver'); // Unfreeze so they can draw again!

    hasClaimedBonus = true; 
    alert("🎉 Image shared! You've earned 1 extra Lucky Draw chance!");
}

function handleImageUpload(input) {
    if (input.files && input.files[0]) {
        const reader = new FileReader();
        reader.onload = function(e) {
            appendImage('You', e.target.result);
            
            // Trigger bonus logic
            grantExtraChance();
        };
        reader.readAsDataURL(input.files[0]);
    }
}