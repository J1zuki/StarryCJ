// Get existing chances or start at 0
let luckyDrawChances = parseInt(localStorage.getItem('luckyChances')) || 0;
// Check if they have already claimed their one-time share bonus
let hasClaimedBonus = localStorage.getItem('hasClaimedShareBonus') === 'true';

// Run this when the page loads to set the name from the URL
document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    const userName = params.get('user');
    if (userName) {
        document.getElementById('chat-with-name').innerText = userName;
    }
});

function grantExtraChance() {
    // Logic: Only grant if they haven't claimed it yet
    if (!hasClaimedBonus) {
        luckyDrawChances++;
        hasClaimedBonus = true;

        // Save state to localStorage
        localStorage.setItem('luckyChances', luckyDrawChances);
        localStorage.setItem('hasClaimedShareBonus', 'true');

        alert(`🎉 Thank you for sharing! You've earned 1 extra Lucky Draw chance. Total: ${luckyDrawChances}`);
    } else {
        console.log("Bonus already claimed previously.");
    }
}

function handleImageUpload(input) {
    if (input.files && input.files[0]) {
        const reader = new FileReader();
        reader.onload = function (e) {
            appendImage('You', e.target.result);

            // Trigger the reward logic
            if (!hasClaimedBonus) {
                grantExtraChance();
                setTimeout(() => botReply("That looks great! I've added your one-time bonus chance! 🍀"), 1000);
            } else {
                setTimeout(() => botReply("Nice image! (Note: Share bonus is only available once)."), 1000);
            }
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
    document.getElementById('chat-modal').style.display = 'none';
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
