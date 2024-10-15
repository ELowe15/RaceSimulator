let players = []; // Array to store player data
const placements = []; // To track the order in which players finish

let raceDuration = 10; // Default race duration
let speeds = [];
let finished = []; // Array to track whether a player has finished
const maxSpeed = 5; // Maximum speed for the players
const minSpeed = 1; // Minimum speed for the players

// Default player and background images (dynamic references)
const defaultPlayerImage = 'bball.png'; // Default to bball.png
const backgroundImage = 'bball_court.jfif'; // Change file extension as needed

// Function to shuffle an array
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// Function to generate random background color
function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

// Function to generate random player names
function getRandomName() {
    const names = ['Jordan', 'LeBron', 'Kobe', 'Shaq', 'Magic', 'Larry', 'Wilt', 'Russell', 'Curry', 'Durant', 'Iverson', 'Garnett'];
    return names[Math.floor(Math.random() * names.length)];
}

// Create a player with a name, image, and background color
function createPlayer(name, image, backgroundColor) {
    return { name, image, backgroundColor }; // Include background color in the player object
}

// Create player element including a color picker for background color
function createPlayerElement(player, index) {
    const playerDiv = document.createElement('div');
    playerDiv.classList.add('player-container');
    playerDiv.style.position = 'absolute'; // Position the entire container absolutely

    // Create a name label
    const nameLabel = document.createElement('div');
    nameLabel.classList.add('player-name-label');
    nameLabel.innerText = player.name;
    playerDiv.appendChild(nameLabel); // Add name label above image

    // Create a player image div
    const playerImageDiv = document.createElement('div');
    playerImageDiv.classList.add('player');
    playerImageDiv.style.backgroundImage = `url('${player.image}')`;
    playerImageDiv.style.backgroundColor = player.backgroundColor; // Set the background color
    playerImageDiv.style.left = '0px'; // Starting position

    playerDiv.appendChild(playerImageDiv); // Add image below name

    const totalPlayers = players.length;
    const BOTTOMOFFSET = 50;
    const spacing = Math.min(400, (window.innerHeight - BOTTOMOFFSET) / (totalPlayers + 1)); // Calculate spacing based on number of players
    playerDiv.style.top = `${(index + 1) * spacing}px`; // Space players vertically

    document.body.appendChild(playerDiv);
    return playerDiv;
}

// Start the race
function startRace() {
    placements.length = 0; // Clear previous placements
    speeds = [];
    finished = [];

    const trackLength = window.innerWidth - 100; // Total distance for the race
    players.forEach((player, index) => {
        const baseSpeed = trackLength / (60 * raceDuration);
        const speed = Math.min(baseSpeed * (Math.random() * 0.4 + 0.8), maxSpeed);
        speeds.push(speed);
        finished.push(false);
    });

    movePlayers(); // Start the race animation
}

// Move players
function movePlayers() {
    const finishLine = window.innerWidth - 120; // Adjust finish line to the left by 20 pixels

    players.forEach((player, index) => {
        if (!finished[index]) {
            const playerContainer = document.getElementsByClassName('player-container')[index]; // Select the container
            let position = parseFloat(playerContainer.style.left) || 0; // Get current left position

            // Adjust speed randomly
            const speedChange = (Math.random() - 0.5) * 0.5;
            speeds[index] = Math.max(minSpeed, Math.min(speeds[index] + speedChange, maxSpeed));

            position += speeds[index]; // Update position based on speed

            // Check for finish line
            if (position >= finishLine) {
                position = finishLine; // Stop at the adjusted finish line
                finished[index] = true; // Mark as finished
                placements.push(player.name); // Add to placements
                console.log(`${player.name} has finished!`);

                // Show the placements when all players have finished
                if (placements.length === players.length) {
                    showRaceResults(); // Call function to show results
                }
            }

            playerContainer.style.left = position + 'px'; // Update container's left position
        }
    });

    if (finished.includes(false)) {
        requestAnimationFrame(movePlayers); // Continue animation
    }
}

// Function to display race results
function showRaceResults() {
    const resultMessage = placements.map((playerName, index) => {
        const placement = index + 1; // Get placement (1st, 2nd, etc.)
        const suffix = placement === 1 ? 'st' : placement === 2 ? 'nd' : placement === 3 ? 'rd' : 'th'; // Determine suffix
        return `${placement}${suffix}: ${playerName}`; // Format the message
    }).join('\n'); // Join results with new lines

    alert(`Race finished!\n${resultMessage}`); // Show results in alert
}

// Save settings to local storage
function saveSettings() {
    const settings = {
        players: players.map(player => ({ name: player.name, image: player.image, backgroundColor: player.backgroundColor })), // Include background color
        raceDuration
    };
    localStorage.setItem('fantasyRaceSettings', JSON.stringify(settings));
    alert('Settings saved!');
}

// Load settings from local storage
function loadSettings() {
    const savedSettings = localStorage.getItem('fantasyRaceSettings');
    if (savedSettings) {
        const settings = JSON.parse(savedSettings);
        players = settings.players.map(player => createPlayer(player.name, player.image, player.backgroundColor)); // Include background color
        raceDuration = settings.raceDuration;
        document.getElementById('raceTime').value = raceDuration; // Update race duration input
        initializeUI(); // Re-initialize UI with loaded settings
        players.forEach((player, index) => createPlayerElement(player, index));
    } else {
        alert('No saved settings found.');
    }
}

// Create controls for player input
function createControls() {
    const controlsDiv = document.createElement('div');
    controlsDiv.classList.add('controls');

    // Input for race duration
    const raceTimeInput = document.createElement('input');
    raceTimeInput.id = 'raceTime';
    raceTimeInput.type = 'number';
    raceTimeInput.value = raceDuration;
    raceTimeInput.min = 1;
    raceTimeInput.placeholder = 'Race Duration (seconds)';
    controlsDiv.appendChild(raceTimeInput);

    // Number of players input
    const numberInput = document.createElement('input');
    numberInput.id = 'numberOfPlayers';
    numberInput.type = 'number';
    numberInput.placeholder = 'Number of Players';
    numberInput.min = 1;
    numberInput.value = 12; // Default number of players
    controlsDiv.appendChild(numberInput);

    const playerListButton = document.createElement('button');
    playerListButton.innerText = 'Player List';
    playerListButton.onclick = () => {
        const numPlayers = parseInt(numberInput.value);
        if (numPlayers > 0) {
            players = []; // Clear existing players
            const playerInputsDiv = document.getElementById('playerInputs');
            playerInputsDiv.innerHTML = ''; // Clear previous inputs

            for (let i = 0; i < numPlayers; i++) {
                const playerDiv = document.createElement('div');
                playerDiv.classList.add('player-input');

                const nameInput = document.createElement('input');
                nameInput.placeholder = `Player ${i + 1} Name`;
                nameInput.classList.add('player-name');
                nameInput.value = getRandomName(); // Assign a random name
                playerDiv.appendChild(nameInput);

                const imageInput = document.createElement('input');
                imageInput.type = 'file';
                imageInput.accept = 'image/*'; // Accept any image type
                imageInput.classList.add('player-image');
                playerDiv.appendChild(imageInput);

                // Add background color input
                const colorInput = document.createElement('input');
                colorInput.type = 'color';
                colorInput.value = getRandomColor(); // Assign random background color
                colorInput.classList.add('player-color');
                playerDiv.appendChild(colorInput);

                playerInputsDiv.appendChild(playerDiv);
            }
        }
    };
    controlsDiv.appendChild(playerListButton);

    const startButton = document.createElement('button');
    startButton.innerText = 'Start Race';
    startButton.onclick = () => {
        const playerDivs = document.querySelectorAll('.player-input');
        players = []; // Reset players array

        playerDivs.forEach((div) => {
            const nameInput = div.querySelector('.player-name');
            const imageInput = div.querySelector('.player-image');
            const colorInput = div.querySelector('.player-color');
            const name = nameInput.value.trim();
            const imageFile = imageInput.files[0];
            const image = imageFile ? URL.createObjectURL(imageFile) : defaultPlayerImage;
            const backgroundColor = colorInput.value || getRandomColor();

            players.push({
                name: name || `Default Player ${players.length + 1}`,
                image,
                backgroundColor
            });
        });

        // Ensure the number of players matches the input
        while (players.length < parseInt(numberInput.value)) {
            players.push(createPlayer(getRandomName(), defaultPlayerImage, getRandomColor())); // Add random background color
        }

        // Clear previous player elements and create new ones
        document.body.innerHTML = ''; // Clear existing players
        initializeUI(); // Retain controls
        players.forEach((player, index) => createPlayerElement(player, index));
        startRace();
    };
    controlsDiv.appendChild(startButton);

    const saveButton = document.createElement('button');
    saveButton.innerText = 'Save Settings';
    saveButton.onclick = saveSettings;
    controlsDiv.appendChild(saveButton);

    const loadButton = document.createElement('button');
    loadButton.innerText = 'Load Settings';
    loadButton.onclick = loadSettings;
    controlsDiv.appendChild(loadButton);

    document.body.appendChild(controlsDiv);
}

// Initialize UI
function initializeUI() {
    const playerInputsDiv = document.createElement('div');
    playerInputsDiv.id = 'playerInputs';
    document.body.appendChild(playerInputsDiv);

    createControls(); // Create controls
}

// Start the application
initializeUI();
