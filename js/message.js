let luckyDrawChances = 0;

function grantExtraChance() {
    luckyDrawChances++;
    alert("🎉 You've earned an extra Lucky Draw chance for sharing with a friend!");
    // Update your database or localStorage here
    localStorage.setItem('luckyChances', luckyDrawChances);
}

// Function to handle sending text
function sendTextMessage() {
    const input = document.getElementById('message-text');
    if (input.value.trim() !== "") {
        appendMessage('You', input.value);
        
        // Logic: If they mention "Lucky Draw", they get a chance
        if (input.value.toLowerCase().includes("lucky draw")) {
            grantExtraChance();
        }
        
        input.value = "";
    }
}

// Function to handle sending image
function handleImageUpload(input) {
    if (input.files && input.files[0]) {
        const reader = new FileReader();
        reader.onload = function(e) {
            appendImage('You', e.target.result);
            
            // AUTOMATIC REWARD for sharing any image in this scenario
            grantExtraChance();
        };
        reader.readAsDataURL(input.files[0]);
    }
}

function appendMessage(sender, text) {
    const msgWindow = document.getElementById('chat-messages');
    msgWindow.innerHTML += `<div class="msg-bubble"><b>${sender}:</b> ${text}</div>`;
}

function appendImage(sender, src) {
    const msgWindow = document.getElementById('chat-messages');
    msgWindow.innerHTML += `<div class="msg-bubble"><b>${sender}:</b><br><img src="${src}" style="width:100px; border-radius:5px;"></div>`;
}