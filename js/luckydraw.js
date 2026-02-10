// --- CONFIGURATION ---
const IS_TESTING_MODE = true; 

// 1. Centralized State Management
function getGameState() {
    // Reset logic for testing
    if (IS_TESTING_MODE && !sessionStorage.getItem('resetDone')) {
        localStorage.setItem('drawChances', '1');
        localStorage.setItem('isGameOver', 'false');
        localStorage.removeItem('hasClaimedShareBonus');
        sessionStorage.setItem('resetDone', 'true');
    }

    let storedChances = localStorage.getItem('drawChances');
    let isGameOver = localStorage.getItem('isGameOver') === 'true';
    
    // Default state for brand new user
    if (storedChances === null) {
        storedChances = "1";
        localStorage.setItem('drawChances', storedChances);
        localStorage.setItem('isGameOver', 'false');
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
        const plural = state.chances === 1 ? "pick" : "picks";
        chanceDisplay.innerText = `${state.chances} remaining daily ${plural}.`;
    }
    
    if (!drawBtn) return; // Safety check

    if (state.isGameOver || state.chances <= 0) {
        drawBtn.innerText = state.isGameOver ? "DRAW COMPLETED" : "NO CHANCES LEFT";
        drawBtn.classList.add('disabled-btn'); 
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
if (drawBtn) {
    drawBtn.addEventListener('click', (e) => {
        let state = getGameState();
        
        if (state.chances > 0) {
            state.chances--;
            
            localStorage.setItem('drawChances', state.chances);
            
            // Logic: Mark game over only when they hit 0
            if (state.chances === 0) {
                localStorage.setItem('isGameOver', 'true');
            }
            
            updateUI(); 
            // Trigger your actual prize animation/logic here!
        } else {
            e.preventDefault(); 
            alert("No chances left!");
        }
    });
}

// 4. Lifecycle Listeners
window.addEventListener('pageshow', updateUI);
document.addEventListener('DOMContentLoaded', updateUI);

// Sync across tabs
window.addEventListener('storage', (e) => {
    if (['drawChances', 'isGameOver', 'hasClaimedShareBonus'].includes(e.key)) {
        updateUI();
    }
});