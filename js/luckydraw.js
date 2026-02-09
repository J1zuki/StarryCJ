// localStorage.clear(); 

// Initialize chances (Default 1 if not set)
let chances = localStorage.getItem('drawChances') !== null 
              ? parseInt(localStorage.getItem('drawChances')) 
              : 1;

// Check if they've already finished their final draw (Freeze flag)
let isGameOver = localStorage.getItem('isGameOver') === 'true';

const drawBtn = document.getElementById('drawBtn');
const chanceDisplay = document.getElementById('chanceCount');

function updateUI() {
    chanceDisplay.innerText = chances;
    
    if (isGameOver || (chances <= 0)) {
        drawBtn.innerText = "NO CHANCES LEFT";
        drawBtn.style.backgroundColor = "#ccc";
        drawBtn.style.pointerEvents = "none"; 
        drawBtn.style.cursor = "not-allowed";
        
        // If they finished their final draw, we freeze the UI completely
        if (isGameOver) {
            drawBtn.innerText = "DRAW COMPLETED";
        }
    }
}

drawBtn.addEventListener('click', (e) => {
    if (chances > 0) {
        chances--;
        localStorage.setItem('drawChances', chances);
        
        // If they just used their last chance, freeze the game forever
        if (chances === 0) {
            localStorage.setItem('isGameOver', 'true');
        }
    } else {
        e.preventDefault(); 
        alert("No chances left!");
    }
});

// Refresh UI on load
window.addEventListener('pageshow', () => {
    chances = parseInt(localStorage.getItem('drawChances')) || 0;
    isGameOver = localStorage.getItem('isGameOver') === 'true';
    updateUI();
});