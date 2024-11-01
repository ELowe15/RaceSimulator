const BASKETBALL = 0;
const FOOTBALL = 1;
const HOCKEY = 2;
const BASEBALL = 3;

// Default player and background images (dynamic references)
const defaultPlayerImage = ['bballHollow.png', 'fballHollow.png','puck.png', 'baseballHollow.png']; // Default to bball.png
const backgroundImage = ['bball_court.jfif', 'fball_field.jpg', 'rink.jpg','baseball_diamond.jfif']; // Change file extension as needed
const songs = ['basketball.mp4', 'NFLonFox.mp4','goodOlHockey.mp4']
let audio = new Audio(songs[0]);

let players = []; // Array to store player data
const placements = []; // To track the order in which players finish

let raceTime; // Default race duration
let speeds = [];
let finished = []; // Array to track whether a player has finished
let finishedCount = 0; // Variable to keep track of how many players have finished
let prevPlayerCount = 0;
let playerListContainer; // Reference to player list container
// Placeholder for standings
let standingsCreated = false;

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
    const names = [
        'Jordan', 'LeBron', 'Kobe', 'Shaq', 'Magic', 'Larry', 'Wilt', 'Russell', 'Curry', 'Durant', 
        'Iverson', 'Garnett', 'Duncan', 'Bird', 'Barkley', 'Wade', 'Harden', 'Westbrook', 'Pippen', 'Ewing',
        'Stockton', 'Malone', 'Olajuwon', 'Robinson', 'Nash', 'Nowitzki', 'Pierce', 'Carter', 'McGrady', 'Payton',
        'Mourning', 'Billups', 'Stoudemire', 'Kidd', 'Paul', 'Allen', 'Miller', 'Hill', 'Howard', 'Webber',
        'Rose', 'Wall', 'Beal', 'Lillard', 'George', 'Butler', 'Tatum', 'Mitchell', 'Young', 'Morant',
        'Embiid', 'Jokic', 'Giannis', 'Zion', 'Edwards', 'Ball', 'Haliburton', 'Fox', 'Ingram', 'DeRozan',
        'Middleton', 'Siakam', 'Gobert', 'Towns', 'Murray', 'Booker', 'Porzingis', 'Adebayo', 'Bridges', 'Ayton',
        'Sabonis', 'Green', 'Brown', 'Smart', 'Harris', 'Maxey', 'Holiday', 'Randle', 'VanVleet', 'Barnes',
        'Cunningham', 'Banchero', 'Suggs', 'Mobley', 'Okoro', 'Vucevic', 'Markkanen', 'Simmons', 'Thompson', 'Wiseman',
        'Poole', 'Wiggins', 'Porter', 'Looney', 'McCollum', 'Brooks', 'Adams', 'Hachimura', 'Avdija', 'Olynyk',
        'Schroder', 'Rubio', 'Dragic', 'Bogdanovic', 'Gallinari', 'Bertans', 'Nurkic', 'Valanciunas', 'Kleber', 'Powell'
    ];
    return names[Math.floor(Math.random() * names.length)];
}

function changeBackground(){
    let background = backgroundImage[document.getElementById('sportSelect').selectedIndex]
    document.body.style.backgroundImage = `url('${background}')`;
}

// Create a player with a name, image, and background color
function createPlayer(name, image, backgroundColor) {
    return { name, image, backgroundColor }; // Include background color in the player object
}

// Function to create player list container
function createPlayerListContainer() {
    if (!playerListContainer) { // Only create if it doesn't exist
        playerListContainer = document.createElement('div');
        playerListContainer.classList.add('player-list'); // Add the background class
        document.body.appendChild(playerListContainer); // Append to the body or a specific section
    }
}

// Create player element including a color picker for background color
function createPlayerElement(player, index) {
    const playerDiv = document.createElement('div');
    playerDiv.classList.add('player-container');
    playerDiv.style.position = 'absolute'; // Position the entire container absolutely

    // Create a position label
    const positionLabel = document.createElement('div');
    positionLabel.classList.add('player-position-label');
    positionLabel.innerText = `${index + 1}th`; // Set position (will update in the race)
    playerDiv.appendChild(positionLabel); // Add position label to the left

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
    const BOTTOMOFFSET = 20;
    const spacing = Math.min(400, (window.innerHeight - BOTTOMOFFSET) / (totalPlayers + 1)); // Calculate spacing based on number of players
    playerDiv.style.top = `${(index + 1) * spacing}px`; // Space players vertically

    document.body.appendChild(playerDiv);
    return playerDiv;
}

// Start the race
function startRace() {
    toggleControls(false); // Hide the controls
    togglePlayerList(false);
    deleteStandings();
    let selectedIndex = document.getElementById('sportSelect').selectedIndex;
    // Update the audio source based on the selected index
    audio.src = songs[selectedIndex];
    audio.load();
    //Restart and play music
    audio.pause();         // Pause the music
    audio.currentTime = 0; // Reset the music to the beginning
    audio.play();
    finishedCount = 0;
    placements.length = 0; // Clear previous placements
    speeds = [];
    finished = [];
    const maxSpeed = 5*10/raceTime; // Maximum speed for the players
    const minSpeed = 1*10/raceTime; // Minimum speed for the players

    const trackLength = window.innerWidth - 100; // Total distance for the race
    players.forEach((player, index) => {
        const baseSpeed = trackLength / (60 * raceTime);
        const speed = Math.min(baseSpeed * (Math.random() * 0.4 + 0.8), maxSpeed);
        speeds.push(speed);
        finished.push(false);

    });

    movePlayers(); // Start the race animation
}

// Move players
function movePlayers() {
    const finishLine = window.innerWidth - 210; // Adjust finish line to the left by 20 pixels
    const maxSpeed = 5*10/raceTime; // Maximum speed for the players
    const minSpeed = 1*10/raceTime; // Minimum speed for the players
    // Store the current positions and their corresponding indices
    const currentPositions = players.map((_, index) => ({
        index,
        position: parseFloat(document.getElementsByClassName('player-container')[index].style.left) || 0
    }));

    players.forEach((player, index) => {
        if (!finished[index]) {
            const playerContainer = document.getElementsByClassName('player-container')[index]; // Select the container
            let position = currentPositions[index].position; // Get current left position
            
            if ((speeds[index] <= (minSpeed*2)) && (Math.floor(Math.random() * 5)%1)) {
                speedChange = minSpeed*3;
            }
            else if ((speeds[index] <= (minSpeed*2.5)) && (Math.floor(Math.random() * 5)%1)) {
                speedChange = minSpeed + (Math.random()) * 0.5;
            }
            /*else if ((speeds[index] >= (maxSpeed*0.7)) && (Math.floor(Math.random() * 10)%3)){
                speedChange = -minSpeed*4;
            }*/
            else if ((speeds[index] >= (maxSpeed*0.8)) && (Math.floor(Math.random() * 10)%2)){
                speedChange = (Math.random() - 1) * 0.5 - minSpeed*1.5;
            } else {
                // Adjust speed randomly
                speedChange = (Math.random() - 0.5) * 0.5;
            }

            
            speeds[index] = Math.max(minSpeed, Math.min(speeds[index] + speedChange, maxSpeed));
            position += speeds[index]; // Update position based on speed

            // Check for finish line
            if (position >= finishLine) {
                position = finishLine; // Stop at the adjusted finish line
                finished[index] = true; // Mark as finished
                finishedCount++;
                placements.push(player.name); // Add to placements
                const placement = finishedCount;
                const suffix = placement === 1 ? 'st' : placement === 2 ? 'nd' : placement === 3 ? 'rd' : 'th'; // Determine suffix
                const positionLabel = document.getElementsByClassName('player-container')[index].querySelector('.player-position-label');
                positionLabel.innerText = `${placement}${suffix}`; // Update position label
                console.log(`${player.name} has finished!`);

                // Show the placements when all players have finished
                if (placements.length === players.length) {
                    endRace(); // Call function to show results
                }
            }

            playerContainer.style.left = position + 'px'; // Update container's left position
        }
    });

    // Recalculate positions and update labels
    const finishedPlayers = currentPositions.filter((_, index) => !finished[index]); // Get players who haven't finished
    const sortedPositions = finishedPlayers.sort((a, b) => b.position - a.position); // Sort based on position

    // Update position labels for the current placements
    sortedPositions.forEach((playerPos, rank) => {
        const positionLabel = document.getElementsByClassName('player-container')[playerPos.index].querySelector('.player-position-label');
        const placement = rank + 1 + finishedCount; // Determine current placement
        const suffix = placement === 1 ? 'st' : placement === 2 ? 'nd' : placement === 3 ? 'rd' : 'th'; // Determine suffix
        positionLabel.innerText = `${placement}${suffix}`; // Update position label
    });

    if (finished.includes(false)) {
        requestAnimationFrame(movePlayers); // Continue animation
    }
}

/* Function to display race results
function showRaceResults() {
    const resultMessage = placements.map((playerName, index) => {
        const placement = index + 1; // Get placement (1st, 2nd, etc.)
        const suffix = placement === 1 ? 'st' : placement === 2 ? 'nd' : placement === 3 ? 'rd' : 'th'; // Determine suffix
        return `${placement}${suffix}: ${playerName}`; // Format the message
    }).join('\n'); // Join results with new lines

    alert(`Race finished!\n${resultMessage}`); // Show results in alert
}*/
function endRace() {
    showStandings();
    toggleControls(true); // Show the controls
}

function deleteStandings(){
    if (document.getElementById('standingsDiv')){
        document.getElementById('standingsDiv').remove();
    }
}

function showStandings() {
    if (document.getElementById('standingsDiv')){
        deleteStandings();
        return;
    }
    const standingsDiv = document.createElement('div');
    standingsDiv.id = 'standingsDiv';
    standingsDiv.style.position = 'fixed';
    standingsDiv.style.top = '50%';
    standingsDiv.style.left = '50%';
    standingsDiv.style.transform = 'translate(-50%, -50%)';
    standingsDiv.style.backgroundColor = '#fff';
    standingsDiv.style.padding = '20px';
    standingsDiv.style.border = '1px solid #ccc';
    standingsDiv.style.borderRadius = '10px';
    standingsDiv.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.5)';
    standingsDiv.style.zIndex = '1001';

    const closeButton = document.createElement('button');
    closeButton.innerText = 'Close';
    closeButton.onclick = () => {
        standingsDiv.remove();
    };

    const copyButton = document.createElement('button');
    copyButton.innerText = 'Copy Standings';
    copyButton.onclick = () => {
        const resultMessage = placements.map((playerName, index) => {
            const placement = index + 1; // Get placement (1st, 2nd, etc.)
            const suffix = placement === 1 ? 'st' : placement === 2 ? 'nd' : placement === 3 ? 'rd' : 'th'; // Determine suffix
            return `${placement}${suffix}: ${playerName}`; // Format the message
        }).join('\n'); // Join results with new lines

        navigator.clipboard.writeText(`Standings\n${resultMessage}`)
            .catch(err => {
                console.error('Failed to copy: ', err);
            });
    };

    const standingsList = placements.map((playerName, index) => {
        const placement = index + 1;
        const suffix = placement === 1 ? 'st' : placement === 2 ? 'nd' : placement === 3 ? 'rd' : 'th';
        return `<p>${placement}${suffix}: ${playerName}</p>`;
    }).join('');

    standingsDiv.innerHTML = `<h3>Standings</h3>${standingsList}`;
    standingsDiv.appendChild(copyButton); // Add the copy button
    standingsDiv.appendChild(closeButton);
    document.body.appendChild(standingsDiv);
}

function toggleControls(visible) {
    const controlsDiv = document.querySelector('.controls');
    if (controlsDiv) {
        controlsDiv.style.display = visible ? 'block' : 'none'; // Show or hide based on the visible flag
    }
}

function togglePlayerList(visible) {
    if (playerListContainer) {
        playerListContainer.style.display = visible ? 'block' : 'none'; // Show or hide based on the visible flag
    }
}

/* Save settings to local storage
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
*/

function updatePlayerList() {
    if (document.getElementById('numberOfPlayers')){
        const numberInput = document.getElementById('numberOfPlayers');
        const numPlayers = parseInt(numberInput.value, 10);
            if (numPlayers > prevPlayerCount) {
                for (let i = prevPlayerCount; i < numPlayers; i++) {
                    const playerDiv = document.createElement('div');
                    playerDiv.classList.add('player-input');

                    const nameInput = document.createElement('input');
                    nameInput.placeholder = `Player ${i + 1} Name`;
                    nameInput.classList.add('player-name');
                    //nameInput.value = getRandomName(); // Assign a random name
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

                    playerListContainer.appendChild(playerDiv);
                }
            }
            else if (numPlayers == 0){
                return;
            }
            else if (numPlayers < prevPlayerCount){
                for (let i = prevPlayerCount - 1; i >= numPlayers; i--) {
                    playerListContainer.removeChild(playerListContainer.children[i]);
                }
            }
            if (numPlayers){
                prevPlayerCount = numPlayers;
            }
        }
}

// Create controls for player input
function createControls() {
    const controlsDiv = document.createElement('div');
    controlsDiv.classList.add('controls');
    

    /*// Race type drop-down
    const raceTypeLabel = document.createElement('label');
    raceTypeLabel.innerText = 'Race Type: ';
    const raceTypeSelect = document.createElement('select');
    const raceTypes = ['Balanced', 'Close', 'Hectic'];
    raceTypes.forEach(type => {
        const option = document.createElement('option');
        option.value = type;
        option.text = type;
        raceTypeSelect.appendChild(option);
    });
    controlsDiv.appendChild(raceTypeLabel);
    controlsDiv.appendChild(raceTypeSelect);
*/
    // Container div for label and select dropdown
    const sportContainer = document.createElement('div');
    sportContainer.style.display = 'flex';
    sportContainer.style.alignItems = 'center';
    sportContainer.style.gap = '5px'; // Add space between label and dropdown if needed
    sportContainer.style.marginBottom = '10px'; // Space below the dropdown

    // Label for sport selection
    const sportLabel = document.createElement('label');
    sportLabel.innerText = 'Select Sport: ';
    sportContainer.appendChild(sportLabel);

    // Dropdown for sports selection
    const sportSelect = document.createElement('select');
    sportSelect.classList.add("styled-dropdown");
    sportSelect.id = 'sportSelect';
    const sports = ['Basketball', 'Football', 'Hockey', 'Baseball'];
    sports.forEach(sport => {
        const option = document.createElement('option');
        option.value = sport;
        option.innerText = sport;
        sportSelect.appendChild(option);
    });
    sportContainer.appendChild(sportSelect);

    // Listen for changes to the selected sport
    sportSelect.addEventListener('change', () => {
        changeBackground();
    });

    // Append the container to the controls div
    controlsDiv.appendChild(sportContainer);

    // Create race time label and input
    const raceTimeLabel = document.createElement('label');
    raceTimeLabel.textContent = 'Approximate Race Time (seconds):';
    controlsDiv.appendChild(raceTimeLabel);

    // Input for race duration
    const raceTimeInput = document.createElement('input');
    raceTimeInput.id = 'raceTime';
    raceTimeInput.type = 'number';
    raceTimeInput.value = 15;
    raceTimeInput.min = 1;
    raceTimeInput.placeholder = 'Race Duration (seconds)';
    raceTimeInput.addEventListener('input', () => {
        if (raceTimeInput.value === '0') {
            raceTimeInput.value = '1';
        }
    });
    controlsDiv.appendChild(raceTimeInput);

    // Create number of players label and input
    const playersLabel = document.createElement('label');
    playersLabel.textContent = 'Number of Players:';
    controlsDiv.appendChild(playersLabel);

    // Number of players input
    const numberInput = document.createElement('input');
    numberInput.id = 'numberOfPlayers';
    numberInput.type = 'number';
    numberInput.placeholder = 'Number of Players';
    numberInput.min = 1;
    numberInput.value = 12; // Default number of players
    // Add an event listener to detect changes to the number of players
    numberInput.addEventListener('input', () => {
        if (numberInput.value === '0') {
            numberInput.value = prevPlayerCount;
        }
        updatePlayerList();
    });
    controlsDiv.appendChild(numberInput);

    const playerListButton = document.createElement('button');
    playerListButton.innerText = 'Player List';
    let visible = true;
    playerListButton.onclick = () => {
        togglePlayerList(visible);
        visible = !visible;
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
            const image = imageFile ? URL.createObjectURL(imageFile) : defaultPlayerImage[document.getElementById('sportSelect').selectedIndex];
            const backgroundColor = colorInput.value || getRandomColor();

            players.push({
                name: name || getRandomName(),
                image,
                backgroundColor
            });
        });

        // Ensure the number of players matches the input
        while (players.length < parseInt(numberInput.value)) {
            players.push(createPlayer(getRandomName(), defaultPlayerImage[document.getElementById('sportSelect').selectedIndex], getRandomColor())); // Add random background color
        }

        // Clear only player elements, not the entire body
        const playerContainers = document.querySelectorAll('.player-container');
        playerContainers.forEach((playerContainer) => playerContainer.remove());

        // Keep the controls visible, only refresh the player elements
        players.forEach((player, index) => createPlayerElement(player, index));        raceTime = parseInt(raceTimeInput.value, 10)
        startRace();
    };
    controlsDiv.appendChild(startButton);

    const standingsButton = document.createElement('button');
    standingsButton.innerText = 'Show Standings';
    standingsButton.onclick = () => {
        showStandings();
    };
    controlsDiv.appendChild(standingsButton);

    /*const saveButton = document.createElement('button');
    saveButton.innerText = 'Save Settings';
    saveButton.onclick = saveSettings;
    controlsDiv.appendChild(saveButton);

    const loadButton = document.createElement('button');
    loadButton.innerText = 'Load Settings';
    loadButton.onclick = loadSettings;
    controlsDiv.appendChild(loadButton);*/

    document.body.appendChild(controlsDiv);
}

// Initialize UI
function initializeUI() {
    // Create controls and player inputs once
    if (!document.getElementById('controls')) {
        createControls();
    }
    // Create player inputs div (player list) only once
    if (!document.getElementById('playerInputs')) {
        createPlayerListContainer();

        updatePlayerList();
        togglePlayerList(false);
    }
}

// Start the application
initializeUI();