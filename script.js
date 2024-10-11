let numCircles = 3; // Number of circles to create
const circles = [];
const placements = []; // To track the order in which circles finish

let raceDuration = 10; // Default race duration
let speeds = [];
let finished = []; // Array to track whether a circle has finished
const maxSpeed = 5; // Maximum speed for the circles
const minSpeed = 1; // Minimum speed for the circles

// Array of image URLs and corresponding names
const circleData = [
    { name: 'Kelly', image: 'Kelly.png' },
    { name: 'Evan', image: 'Evan.png' },
    { name: 'Scott', image: 'Scott.png' } // Ensure you have exactly three unique images
];

// Shuffle the circle data (names and images together)
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// Shuffle the circle data once
shuffleArray(circleData);

// Define starting and finish line positions
const startPosition = 50; // Starting X position
const finishLine = window.innerWidth - 100; // Finish line position

// Create a circle with a unique image and name
function createCircle(index) {
    const circle = document.createElement('div');
    circle.classList.add('circle');

    // Use the shuffled image based on the index
    circle.style.backgroundImage = `url('${circleData[index].image}')`;

    // Set starting position
    circle.style.left = startPosition + 'px';

    // Calculate vertical position based on the index to evenly space circles
    const spacing = (window.innerHeight - 100) / (numCircles + 1); // +1 to avoid sticking to the edges
    circle.style.top = (spacing * (index + 1)) + 'px'; // Evenly spaced

    circles.push(circle);
    document.body.appendChild(circle);
}

// Create multiple circles with unique images and names
function createCircles() {
    for (let i = 0; i < numCircles; i++) {
        createCircle(i); // Pass the index to use unique images and names
    }
}

// Start the race with a specific duration
function startRace() {
    placements.length = 0; // Clear previous placements
    speeds = [];
    finished = [];
    
    const trackLength = finishLine - startPosition; // Total distance for the race

    circles.forEach((circle, index) => {
        // Calculate the base speed needed for each circle to finish the race in raceDuration
        const baseSpeed = trackLength / (60 * raceDuration); // Pixels per frame for the circle to finish in raceDuration seconds

        // Randomize the base speed for each circle by a factor of +/- 20% and cap it at maxSpeed
        const speed = Math.min(baseSpeed * (Math.random() * 0.4 + 0.8), maxSpeed); // Speed capped at maxSpeed
        speeds.push(speed); // Store speed for this circle

        // Track if this circle has finished the race
        finished.push(false);
    });

    moveCircles(); // Start the race animation
}

// Move circles with gradually changing speeds
function moveCircles() {
    circles.forEach((circle, index) => {
        // Only move circles that haven't finished yet
        if (!finished[index]) {
            let position = parseFloat(circle.style.left); // Get current position

            // Adjust speed randomly
            const speedChange = (Math.random() - 0.5) * 0.5; // Change speed by +/- 0.5
            speeds[index] = Math.max(minSpeed, Math.min(speeds[index] + speedChange, maxSpeed)); // Ensure speed is within limits

            position += speeds[index]; // Move based on the circle's speed

            // Check if the circle has crossed the finish line
            if (position >= finishLine) {
                position = finishLine; // Stop at the finish line
                finished[index] = true; // Mark this circle as finished

                // Announce the placement of the circle by name
                placements.push(circleData[index].name); // Add this circle's name to the placements

                console.log(`${circleData[index].name} has finished!`);

                // Check if this is the last circle to finish
                if (placements.length === numCircles) {
                    // Announce final placements
                    alert(`Race finished!\n1st: ${placements[0]}\n2nd: ${placements[1]}\n3rd: ${placements[2]}`);

                    // Show the new race button
                    document.getElementById('newRaceButton').style.display = 'block';
                }
            }

            circle.style.left = position + 'px'; // Update the position
        }
    });

    // Continue moving if any circles haven't finished
    if (finished.includes(false)) {
        requestAnimationFrame(moveCircles); // Call moveCircles again for the next frame
    }
}

// Event listener for the "Start" button
document.getElementById('startButton').addEventListener('click', () => {
    // Get the race duration from the input field
    raceDuration = parseFloat(document.getElementById('raceTime').value);
    
    // Create circles and start the race
    if (circles.length === 0) {
        createCircles();
    }
    startRace();
});

// Event listener for the "Start New Race" button
document.getElementById('newRaceButton').addEventListener('click', () => {
    // Reset the circles and placements for a new race
    circles.forEach(circle => document.body.removeChild(circle));
    circles.length = 0; // Clear the circles array
    placements.length = 0; // Clear previous placements
    document.getElementById('newRaceButton').style.display = 'none'; // Hide the new race button
});
