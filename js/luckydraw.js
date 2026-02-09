// --- CONFIGURATION ---
const IS_TESTING_MODE = true; // Set to false when you go live!

// 1. Centralized State Management (Using localStorage)
function getGameState() {
    // If testing, we force a reset of the specific keys we care about
    if (IS_TESTING_MODE && !sessionStorage.getItem('resetDone')) {
        localStorage.setItem('drawChances', '1');
        localStorage.setItem('isGameOver', 'false');
        localStorage.removeItem('hasClaimedShareBonus');
        sessionStorage.setItem('resetDone', 'true'); // Prevents infinite reset loop during session
    }

    const storedChances = localStorage.getItem('drawChances');
    const isGameOver = localStorage.getItem('isGameOver') === 'true';
    
    // Default state for a brand new user
    if (storedChances === null) {
        localStorage.setItem('drawChances', 1);
        localStorage.setItem('isGameOver', 'false');
        return { chances: 1, isGameOver: false };
    }
    
    return { 
        chances: parseInt(storedChances), 
        isGameOver: isGameOver 
    };
}

const drawBtn = document.getElementById('drawBtn');
const chanceDisplay = document.getElementById('chanceCount');

// 2. UI Update Logic
function updateUI() {
    const state = getGameState();
    
    if (chanceDisplay) {
        // Correct grammar: "pick" if 1, "picks" if 0 or 2+
        const plural = state.chances === 1 ? "pick" : "picks";
        chanceDisplay.innerText = `${state.chances} remaining daily ${plural}.`;
    }
    
    if (state.isGameOver || state.chances <= 0) {
        drawBtn.innerText = state.isGameOver ? "DRAW COMPLETED" : "NO CHANCES LEFT";
        drawBtn.classList.add('disabled-btn'); // Best to use a CSS class
        drawBtn.style.backgroundColor = "#ccc";
        drawBtn.style.pointerEvents = "none";
    } else {
        drawBtn.innerText = "PICK A TICKET!";
        drawBtn.classList.remove('disabled-btn');
        drawBtn.style.backgroundColor = ""; 
        drawBtn.style.pointerEvents = "auto";
    }
}

// 3. The Draw Action
drawBtn.addEventListener('click', (e) => {
    let state = getGameState();
    
    if (state.chances > 0) {
        state.chances--;
        
        // Save new state to localStorage
        localStorage.setItem('drawChances', state.chances);
        
        // Only set game over if they actually have 0 chances
        if (state.chances === 0) {
            localStorage.setItem('isGameOver', 'true');
        }
        
        updateUI(); 
    } else {
        e.preventDefault(); 
        alert("No chances left!");
    }
});

// 4. Lifecycle Listeners
window.addEventListener('pageshow', updateUI);
document.addEventListener('DOMContentLoaded', updateUI);

// Sync across tabs
window.addEventListener('storage', (e) => {
    if (['drawChances', 'isGameOver', 'hasClaimedShareBonus'].includes(e.key)) {
        updateUI();
    }
});