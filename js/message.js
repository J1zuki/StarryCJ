// --- CONFIGURATION ---
const IS_TESTING_MODE = true; // Set to false when you go live

// 1. The core function to send a message
function sendTextMessage() {
    const input = document.getElementById('message-text');
    if (!input) return;

    const message = input.value.trim();

    if (message !== "") {
        appendMessage('You', message, 'sent');

        if (message.toLowerCase().includes("lucky draw")) {
            safeBotReply("Checking your eligibility... 🍀", 800);
            grantExtraChance();
        } else {
            safeBotReply("Thanks for the message!", 1200);
        }

        input.value = "";
    }
}

// 2. UNIFIED: Function to show text OR images
function appendMessage(sender, content, type = 'received', isImage = false) {
    const chatWindow = document.getElementById('chat-messages');
    if (!chatWindow) return;

    const msgDiv = document.createElement('div');
    msgDiv.classList.add('message', type); 

    let innerHTML = `<div class="message-info"><strong>${sender}</strong></div>`;
    
    if (isImage) {
        innerHTML += `<div class="message-text"><img src="${content}" style="max-width:200px; border-radius:8px; display:block; margin-top:5px;"></div>`;
    } else {
        innerHTML += `<div class="message-text">${content}</div>`;
    }

    msgDiv.innerHTML = innerHTML;
    chatWindow.appendChild(msgDiv);
    chatWindow.scrollTo({ top: chatWindow.scrollHeight, behavior: 'smooth' });
}

// 3. Helper for bot replies
function safeBotReply(text, delay) {
    setTimeout(() => {
        appendMessage('Bot', text, 'received');
    }, delay);
}

// 4. Handle Enter Key
function handleKeyPress(event) {
    if (event.key === 'Enter') {
        sendTextMessage();
    }
}

// 5. Lucky Draw Logic (Updated to localStorage for "Permanent" memory)
function grantExtraChance() {
    // localStorage persists even if the browser is closed
    const hasClaimed = localStorage.getItem('hasClaimedShareBonus') === 'true';

    if (hasClaimed) {
        safeBotReply("You've already used your bonus! 🍀", 1500);
        return;
    }

    // Get current chances from localStorage
    let currentChances = parseInt(localStorage.getItem('drawChances')) || 0;
    currentChances += 1;

    // Save back to localStorage
    localStorage.setItem('drawChances', currentChances);
    localStorage.setItem('isGameOver', 'false');
    localStorage.setItem('hasClaimedShareBonus', 'true'); // Flag is now saved permanently

    safeBotReply("🎉 One-time bonus earned! Go back to the Lucky Draw page!", 1800);
}

// 6. Image Upload Handler
function handleImageUpload(input) {
    if (input.files && input.files[0]) {
        const reader = new FileReader();
        reader.onload = function (e) {
            const imageUrl = e.target.result;
            appendMessage('You', imageUrl, 'sent', true);
            grantExtraChance();
        };
        reader.readAsDataURL(input.files[0]);
    }
}

// 7. UI Controls
function closeChat() {
    // Any other logic you want (like closing the modal)
    console.log("Closing chat and redirecting...");
    
    // This triggers the redirect
    window.location.href = "luckydraw.html"; // Use .html or .php depending on your file extension
}

// --- 8. RESET LOGIC FOR TESTING ---
// This runs every time the page loads
(function init() {
    if (IS_TESTING_MODE) {
        console.log("🛠️ Testing Mode Active: Clearing localStorage for reset...");
        // This wipes the "already shared" flag so you can test again and again
        localStorage.removeItem('hasClaimedShareBonus');
        localStorage.setItem('drawChances', '0');
        localStorage.setItem('isGameOver', 'false');
    } else {
        console.log("🚀 Live Mode: Progress will be saved permanently.");
    }
})();