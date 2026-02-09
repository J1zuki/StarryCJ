// Initial State
let chances = 3;
const prizes = [
    "Free Delivery", 
    "$10 Discount", 
    "Try Again", 
    "50 Gem Points"
];

const drawBtn = document.getElementById('drawBtn');
const shareBtn = document.getElementById('shareBtn');
const chanceDisplay = document.getElementById('chanceCount');

// 1. Pick a Ticket Logic
drawBtn.addEventListener('click', () => {
    if (chances > 0) {
        chances--;
        updateUI();
        
        // Randomize result
        const result = prizes[Math.floor(Math.random() * prizes.length)];
        
        // Trigger Animation (Visual feedback)
        drawBtn.innerText = "PICKING...";
        drawBtn.disabled = true;

        setTimeout(() => {
            alert(`Congratulations! You won: ${result}`);
            drawBtn.innerText = "PICK A TICKET!";
            drawBtn.disabled = false;
        }, 1000);

    } else {
        alert("No chances left! Share with friends to get +1 chance.");
    }
});

// 2. Share to Earn Logic
shareBtn.addEventListener('click', () => {
    // In a real app, you'd use the Web Share API or a redirect
    if (navigator.share) {
        navigator.share({
            title: 'StarryCJ Vouchers',
            url: window.location.href
        }).then(() => {
            grantBonusChance();
        });
    } else {
        // Fallback for desktop/browsers that don't support native share
        alert("Link copied to clipboard! Bonus chance granted.");
        grantBonusChance();
    }
});

function grantBonusChance() {
    chances++;
    updateUI();
}

function updateUI() {
    chanceDisplay.innerText = chances;
}