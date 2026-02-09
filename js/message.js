function sendTextMessage() {
    const input = document.getElementById('message-text');
    if (!input) return; // Guard clause if input is missing

    const message = input.value.trim();

    if (message !== "") {
        // Use a fallback if appendMessage isn't defined yet
        if (typeof appendMessage === "function") {
            appendMessage('You', message);
        } else {
            console.log("You:", message);
        }

        if (message.toLowerCase().includes("lucky draw")) {
            grantExtraChance(); 
            safeBotReply("Checking your eligibility... 🍀", 1000);
        } else {
            safeBotReply("Thanks for the message!", 1200);
        }

        input.value = "";
    }
}

// Helper to prevent "botReply is not defined" errors
function safeBotReply(text, delay) {
    setTimeout(() => {
        if (typeof botReply === "function") {
            botReply(text);
        } else {
            console.log("Bot:", text);
        }
    }, delay);
}

function grantExtraChance() {
    const hasClaimed = localStorage.getItem('hasClaimedShareBonus') === 'true';

    if (hasClaimed) {
        safeBotReply("You've already claimed your one-time bonus chance!", 1500);
        return; 
    }

    let currentChances = parseInt(localStorage.getItem('drawChances')) || 0;
    currentChances += 1;
    
    localStorage.setItem('drawChances', currentChances);
    localStorage.setItem('hasClaimedShareBonus', 'true');
    localStorage.setItem('isGameOver', 'false'); 

    safeBotReply("🎉 One-time bonus earned! Go back to the Lucky Draw page to use it!", 1500);
}