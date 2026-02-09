// Initialize chances from localStorage, or set to 1 if it's the first time
let chances = localStorage.getItem('drawChances') ? parseInt(localStorage.getItem('drawChances')) : 1;

const drawBtn = document.getElementById('drawBtn');
const chanceDisplay = document.getElementById('chanceCount');

// Function to update the text on screen
function updateUI() {
    chanceDisplay.innerText = chances;
    if (chances <= 0) {
        drawBtn.innerText = "NO CHANCES LEFT";
        drawBtn.style.backgroundColor = "#ccc";
        drawBtn.style.pointerEvents = "none"; // Disable clicking
    }
}

// Run on page load
updateUI();

drawBtn.addEventListener('click', (e) => {
    if (chances > 0) {
        chances--;
        localStorage.setItem('drawChances', chances); // Save the new count
    } else {
        e.preventDefault(); // Stop them from going to win.html
        alert("No chances left!");
    }
});