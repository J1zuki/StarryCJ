const members = [
    { id: 1, name: "Alan Yeo", avatar: "./images/members/alan.png", group: "all" },
    { id: 2, name: "Jemmy Lim", avatar: "./images/members/jemmy.png", group: "all" },
    { id: 3, name: "Gibil Teo", avatar: "./images/members/gibil.png", group: "all" },
    { id: 4, name: "Amy Yeo", avatar: "./images/members/amy.png", group: "all" },
    { id: 5, name: "Elly Puah", avatar: "./images/members/elly.png", group: "nearby" }
];

function renderMembers() {
    const allList = document.getElementById('all-friends-list');
    const nearbyList = document.getElementById('nearby-members-list');
    
    if (!allList || !nearbyList) return;

    let allHTML = "";
    let nearbyHTML = "";

    members.forEach(member => {
        const html = `
            <div class="member-card">
                <img src="${member.avatar}" alt="${member.name}" class="member-avatar">
                <div class="member-info">
                    <div class="member-name">${member.name}</div>
                    <button class="message-btn" onclick="openChat('${member.name}')">Message</button>
                </div>
            </div>`;
        
        if (member.group === 'all') allHTML += html;
        else nearbyHTML += html;
    });

    allList.innerHTML = allHTML;
    nearbyList.innerHTML = nearbyHTML;
}

function openChat(name) {
    alert("Opening chat for: " + name); // This will confirm the button click works
    window.location.href = `message.html?user=${encodeURIComponent(name)}`;
}


// Initialize on load
document.addEventListener('DOMContentLoaded', () => {
    // 1. Get the parameters from the URL
    const urlParams = new URLSearchParams(window.location.search);
    const userName = urlParams.get('user');

    // 2. Find the element where you want to show the name (e.g., an <h2> or <span>)
    const chatTitle = document.getElementById('chat-user-name'); 

    // 3. Update the text
    if (userName && chatTitle) {
        chatTitle.textContent = userName;
    }
});