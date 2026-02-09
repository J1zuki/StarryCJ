// 1. Centralized State Management
function getGameState() {
    const storedChances = sessionStorage.getItem('drawChances');
    const isGameOver = sessionStorage.getItem('isGameOver') === 'true';
    
    // Default state for a brand new session
    if (storedChances === null) {
        sessionStorage.setItem('drawChances', 1);
        sessionStorage.setItem('isGameOver', 'false');
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
    
    if (chanceDisplay) chanceDisplay.innerText = state.chances;
    
    if (state.isGameOver || state.chances <= 0) {
        drawBtn.innerText = state.isGameOver ? "DRAW COMPLETED" : "NO CHANCES LEFT";
        drawBtn.style.backgroundColor = "#ccc";
        drawBtn.style.pointerEvents = "none";
        drawBtn.style.cursor = "not-allowed";
    } else {
        drawBtn.innerText = "PICK A TICKET!";
        drawBtn.style.backgroundColor = ""; 
        drawBtn.style.pointerEvents = "auto";
        drawBtn.style.cursor = "pointer";
    }
}

// 3. The Draw Action
drawBtn.addEventListener('click', (e) => {
    let state = getGameState();
    
    if (state.chances > 0) {
        state.chances--;
        
        // Save new state
        sessionStorage.setItem('drawChances', state.chances);
        if (state.chances === 0) {
            sessionStorage.setItem('isGameOver', 'true');
        }
        
        // If your page navigates away after clicking, 
        // the 'pageshow' listener below will handle the UI refresh when they return.
        updateUI(); 
    } else {
        e.preventDefault(); 
        alert("No chances left!");
    }
});

// 4. Lifecycle Listeners
// 'pageshow' is crucial: it fires when the page loads AND when navigating back/forward
window.addEventListener('pageshow', updateUI);

// Sync across tabs (if user opens the same session in two tabs)
window.addEventListener('storage', (e) => {
    if (e.key === 'drawChances' || e.key === 'isGameOver') {
        updateUI();
    }
});

// Ensure UI is correct when hitting 'Back' button or loading page
window.addEventListener('pageshow', updateUI);
document.addEventListener('DOMContentLoaded', updateUI);