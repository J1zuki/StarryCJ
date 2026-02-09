// Function to sync data from localStorage
function getGameState() {
    const storedChances = localStorage.getItem('drawChances');
    // If it's the first time ever, set it to 1
    if (storedChances === null) {
        localStorage.setItem('drawChances', 1);
        return 1;
    }
    return parseInt(storedChances);
}

let chances = getGameState();
let isGameOver = localStorage.getItem('isGameOver') === 'true';

const drawBtn = document.getElementById('drawBtn');
const chanceDisplay = document.getElementById('chanceCount');

function updateUI() {
    // Always get the freshest data before updating
    chances = getGameState();
    isGameOver = localStorage.getItem('isGameOver') === 'true';
    
    if (chanceDisplay) chanceDisplay.innerText = chances;
    
    if (isGameOver || chances <= 0) {
        drawBtn.innerText = isGameOver ? "DRAW COMPLETED" : "NO CHANCES LEFT";
        drawBtn.classList.add('disabled'); // Use a CSS class for styling
        drawBtn.style.backgroundColor = "#ccc";
        drawBtn.style.pointerEvents = "none"; 
    } else {
        drawBtn.innerText = "PICK A TICKET!";
        drawBtn.style.backgroundColor = ""; // Reset to original CSS
        drawBtn.style.pointerEvents = "auto";
    }
}

drawBtn.addEventListener('click', (e) => {
    chances = getGameState(); // Check chances one last time
    if (chances > 0) {
        chances--;
        localStorage.setItem('drawChances', chances);
        
        if (chances === 0) {
            localStorage.setItem('isGameOver', 'true');
        }
    } else {
        e.preventDefault(); 
        alert("No chances left!");
    }
});

// Use 'pageshow' to catch when users click the 'Back' button
window.addEventListener('pageshow', updateUI);
// Also run on initial load
document.addEventListener('DOMContentLoaded', updateUI);