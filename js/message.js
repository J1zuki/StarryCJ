// 1. Session-based: Resets to 0 every time the browser/tab is reopened
let sessionChances = parseInt(sessionStorage.getItem('sessionChances')) || 0;

// 2. Persistent: Remembers FOREVER if they already got the share bonus
let hasClaimedBonus = localStorage.getItem('hasClaimedShareBonus') === 'true';

document.addEventListener('DOMContentLoaded', () => {
    // Display the session-based chances (starts at 0 on fresh reopen)
    console.log("Current Session Chances:", sessionChances);
    
    const params = new URLSearchParams(window.location.search);
    const userName = params.get('user');
    if (userName) {
        document.getElementById('chat-with-name').innerText = userName;
    }
});

function grantExtraChance() {
    // Logic: Only grant if they haven't claimed it in their lifetime on this browser
    if (!hasClaimedBonus) {
        sessionChances++;
        hasClaimedBonus = true; // Mark as used forever
        
        // Save session data (lost when tab closes)
        sessionStorage.setItem('sessionChances', sessionChances);
        
        // Save persistent data (kept forever)
        localStorage.setItem('hasClaimedShareBonus', 'true');
        
        alert(`🎉 One-time bonus earned! Session Total: ${sessionChances}`);
    } else {
        alert("Selection received! (Note: You've already used your one-time share bonus).");
    }
}

function handleImageUpload(input) {
    if (input.files && input.files[0]) {
        const reader = new FileReader();
        reader.onload = function(e) {
            appendImage('You', e.target.result);
            
            // Only triggers if hasClaimedBonus is false
            grantExtraChance();
        };
        reader.readAsDataURL(input.files[0]);
    }
}

// Message appending functions

function appendMessage(sender, text) {
    const msgWindow = document.getElementById('chat-messages');
    msgWindow.innerHTML += `<div class="msg-bubble"><b>${sender}:</b> ${text}</div>`;
    msgWindow.scrollTop = msgWindow.scrollHeight; // Auto-scroll
}

function appendImage(sender, src) {
    const msgWindow = document.getElementById('chat-messages');
    msgWindow.innerHTML += `<div class="msg-bubble"><b>${sender}:</b><br><img src="${src}" style="width:100%; max-width:150px; border-radius:5px; margin-top:5px;"></div>`;
    msgWindow.scrollTop = msgWindow.scrollHeight;
}

function closeChat() {
    // Redirect back to the members/share page
    window.location.href = 'share.html';
}


function sendTextMessage() {
    const input = document.getElementById('message-text');
    const message = input.value.trim();

    if (message !== "") {
        appendMessage('You', message);

        // 1. Check for Lucky Draw keyword
        if (message.toLowerCase().includes("lucky draw")) {
            grantExtraChance();
            setTimeout(() => botReply("Awesome! I've added your extra entry. Good luck! 🍀"), 1000);
        } else {
            // 2. Standard bot reply for other messages
            setTimeout(() => botReply("Thanks for the message! How can I help you today?"), 1200);
        }

        input.value = "";
    }
}

// The Bot's side of the conversation
function botReply(text) {
    const msgWindow = document.getElementById('chat-messages');
    msgWindow.innerHTML += `
        <div class="msg-bubble bot-msg" style="align-self: flex-end; background: var(--navy-blue); color: white;">
            <b>StarryBot:</b> ${text}
        </div>`;
    msgWindow.scrollTop = msgWindow.scrollHeight;
}
