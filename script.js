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
        const color = score >= 838 ? 'green' : 'red'; // Change to a more nuanced color transition if needed
        scoreDisplay.style.color = color;
    }

    // Show or hide rust layers based on the current score
    function updateRustLayers() {
        const progress = Math.min(Math.max((score - 700) / (838 - 700), 0), 1);
        const indexToShow = Math.floor((1 - progress) * rustLayers.length);
        rustLayers.forEach((layer, index) => {
            layer.style.display = index < indexToShow ? 'block' : 'none';
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
