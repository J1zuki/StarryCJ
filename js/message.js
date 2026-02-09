let luckyDrawChances = parseInt(localStorage.getItem('luckyChances')) || 0;

function grantExtraChance() {
    luckyDrawChances++;
    alert(`🎉 You've earned an extra Lucky Draw chance! Total: ${luckyDrawChances}`);
    localStorage.setItem('luckyChances', luckyDrawChances);
}

function sendTextMessage() {
    const input = document.getElementById('message-text');
    const message = input.value.trim();
    
    if (message !== "") {
        appendMessage('You', message);
        
        if (message.toLowerCase().includes("lucky draw")) {
            grantExtraChance();
        }
        input.value = "";
    }
}

function handleKeyPress(e) {
    if (e.key === 'Enter') sendTextMessage();
}

function handleImageUpload(input) {
    if (input.files && input.files[0]) {
        const reader = new FileReader();
        reader.onload = function(e) {
            appendImage('You', e.target.result);
            grantExtraChance();
        };
        reader.readAsDataURL(input.files[0]);
    }
}

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

// ... (keep your existing variables at the top)

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

// ... (keep handleImageUpload and other functions)