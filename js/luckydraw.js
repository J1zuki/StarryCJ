// 1. Use sessionStorage so it resets when you close/reopen the tab
let chances = sessionStorage.getItem('drawChances') !== null 
              ? parseInt(sessionStorage.getItem('drawChances')) 
              : 1;

const drawBtn = document.getElementById('drawBtn');
const chanceDisplay = document.getElementById('chanceCount');

function updateUI() {
    chanceDisplay.innerText = chances;
    if (chances <= 0) {
        drawBtn.innerText = "NO CHANCES LEFT";
        drawBtn.style.backgroundColor = "#ccc";
        drawBtn.style.pointerEvents = "none"; 
        drawBtn.style.cursor = "not-allowed";
    }
}

// 2. Handle the click: Save the '0' BEFORE moving to the win page
drawBtn.addEventListener('click', (e) => {
    if (chances > 0) {
        chances--;
        sessionStorage.setItem('drawChances', chances); 
        // We don't need updateUI() here because the page is about to change
    } else {
        e.preventDefault(); 
        alert("No chances left!");
    }
});

// 3. IMPORTANT: This ensures that if the user hits "Back", 
// the page checks the storage again and shows 0.
window.addEventListener('pageshow', (event) => {
    const savedChances = sessionStorage.getItem('drawChances');
    if (savedChances !== null) {
        chances = parseInt(savedChances);
    }
    updateUI();
});