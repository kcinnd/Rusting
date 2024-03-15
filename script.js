document.addEventListener('DOMContentLoaded', () => {
    let score = 700; // Initial score
    const scoreDisplay = document.getElementById('scoreDisplay');
    const rustLayers = document.querySelectorAll('.rust-layer');

    // Update the score and visuals based on interaction
    function updateGame(dialValue) {
        score += dialValue;
        updateScoreDisplay();
        updateRustLayers();
    }

    // Update the score display with the current score and change its color
   function updateScoreDisplay() {
        scoreDisplay.textContent = score;
    
        // Calculate how close the score is to 838, where 0 is 700 and 1 is 838
        const progress = (score - 700) / (838 - 700);
        const cappedProgress = Math.min(Math.max(progress, 0), 1); // Ensure progress is between 0 and 1
    
        // Interpolate between red and green based on progress
        const red = Math.floor(255 * (1 - cappedProgress));
        const green = Math.floor(255 * cappedProgress);
        scoreDisplay.style.color = `rgb(${red}, ${green}, 0)`;
    }

    // Show or hide rust layers based on the current score
    function updateRustLayers() {
        const progress = (score - 700) / (838 - 700);
        const cappedProgress = Math.min(Math.max(progress, 0), 1); // Ensure progress is between 0 and 1
    
        rustLayers.forEach((layer, index) => {
            const layerProgress = (cappedProgress * rustLayers.length) - index;
            const opacity = 1 - Math.min(Math.max(layerProgress, 0), 1);
            layer.style.opacity = opacity.toString();
        });
    }

    // Attach event listeners to each dial
    document.querySelectorAll('.dial').forEach(dial => {
        const clockwise = dial.querySelector('.clockwise');
        const counterclockwise = dial.querySelector('.counterclockwise');
        const value = parseInt(dial.getAttribute('data-value'), 10); // Store dial values in data attributes

        clockwise.addEventListener('click', () => updateGame(value));
        counterclockwise.addEventListener('click', () => updateGame(-value));
    });

    // Initial update
    updateScoreDisplay();
    updateRustLayers();
});
