[
  { "id": 1, "name": "Alan Yeo", "avatar": "./images/members/alan.png", "group": "all" },
  { "id": 2, "name": "Jemmy Lim", "avatar": "./images/members/jemmy.png", "group": "all" },
  { "id": 3, "name": "Gibil Teo", "avatar": "./images/members/gibil.png", "group": "all" },
  { "id": 4, "name": "Amy Yeo", "avatar": "./images/members/amy.png", "group": "all" },
  { "id": 5, "name": "Elly Puah", "avatar": "./images/members/elly.png", "group": "nearby" }
]

const members = [
    { id: 1, name: "Alan Yeo", avatar: "https://via.placeholder.com/60", group: "all" },
    { id: 2, name: "Jemmy Lim", avatar: "https://via.placeholder.com/60", group: "all" },
    { id: 3, name: "Gibil Teo", avatar: "https://via.placeholder.com/60", group: "all" },
    { id: 4, name: "Amy Yeo", avatar: "https://via.placeholder.com/60", group: "all" },
    { id: 5, name: "Elly Puah", avatar: "https://via.placeholder.com/60", group: "nearby" }
];

function renderMembers() {
    const allList = document.getElementById('all-friends-list');
    const nearbyList = document.getElementById('nearby-members-list');

    members.forEach(member => {
        const memberHTML = `
            <div class="member-card">
                <img src="${member.avatar}" alt="${member.name}" class="member-avatar">
                <div class="member-info">
                    <div class="member-name">${member.name}</div>
                    <button class="message-btn" onclick="openChat('${member.name}')">Message</button>
                </div>
                <div class="action-icons">
                    <span class="icon-plus">⊕</span>
                    <span class="icon-minus">⊖</span>
                </div>
            </div>
        `;

        if (member.group === 'all') {
            allList.innerHTML += memberHTML;
        } else {
            nearbyList.innerHTML += memberHTML;
        }
    });
}

function openChat(name) {
    // You can replace this alert with a redirect to a chat page
    // window.location.href = `chat.html?user=${name}`;
    alert("Opening chat with " + name);
}

// Initialize on load
document.addEventListener('DOMContentLoaded', renderMembers);