/**
 * script.js
 * 
 * Author: Evan Lowe
 * Created: Oct 10 2024
 * 
 * Description:
 * This is the main JavaScript file for the fantasy sports race application.
 * It handles the race setup, player creation, user interactions, and animation
 * logic. Features include player customization, race simulation, standings 
 * display, and event listeners for UI controls.
 * 
 * Functions:Momentum
 * - changeBackground: Changes background image based on selected sport.
 * - createPlayerListContainer: Initializes the player list container.
 * - startRace: Begins the race animation and initializes player speeds.
 * - movePlayers: Animates players towards the finish line.
 * - showStandings: Displays the final standings after the race.
 * - saveSettings / loadSettings: Save and load player and race configurations.
 * 
 * Dependencies:
 * - raceTools.js: For player name and color generation.
 * 
 * Version: 1.0
 */

// Constants for sports and race types
const BASKETBALL = 0, FOOTBALL = 1, HOCKEY = 2, BASEBALL = 3;
const BALANCED = 0, HECTIC = 1, CLOSE = 2;

// Paths for images and music
const imageRoot = 'Images/', musicRoot = 'Music/';

// Default player and background images (dynamic references)
const defaultPlayerImage = ['bballHollow.png', 'fballHollow.png','puck.png', 'baseballHollow.png']; // Default to bball.png
const backgroundImage = ['bball_court.jpg', 'fball_field.jpg', 'rink.jpg','diamond.png']; // Change file extension as needed

const songs = ['basketball.mp4', 'NFLonFox.mp4', 'HockeyNight.mp4', 'shipping.mp4']
let audio = new Audio(); // Audio setup
let isSongSelected = false;

let players = []; // Array to store player data
let placements = []; // To track the order in which players finish
let tempPlacements = []; // To track the order in which players finish

let raceTime; // Default race duration
let speeds = [];
let finished = []; // Array to track whether a player has finished
let finishedCount = 0; // Variable to keep track of how many players have finished
let prevPlayerCount = 0;
let playerListContainer; // Reference to player list container
// Placeholder for standings
let standingsCreated = false;

//Sets the background image based on the selected sport
function changeBackground(){
    let background = imageRoot + backgroundImage[document.getElementById('sportSelect').selectedIndex]
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

// Function to populate player list with given player data
function loadPlayerList(players){
    playerListContainer.innerHTML = '';  // Clear the container
    prevPlayerCount = 0;
    updatePlayerList(players);
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

function refreshPlayerElements(create){
    const playerContainers = document.querySelectorAll('.player-container');
    playerContainers.forEach((playerContainer) => playerContainer.remove());
    if (create){
        players.forEach((player, index) => createPlayerElement(player, index));
    } 
}

// Start the race
function startRace() {
    refreshPlayerElements(true);
    toggleControls(false); // Hide the controls
    togglePlayerList(false);
    deleteStandings();
    setFinishLinePosition();
    raceTime = parseInt(document.getElementById('raceTime').value, 10);
    finishedCount = 0;
    tempPlacements.length = 0; // Clear previous placements
    speeds = [];
    finished = [];
    
    const maxSpeed = 5*10/raceTime; // Maximum speed for the players
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
    const relativeFinish = parseInt(document.querySelector('.finish-line').style.left, 10);
    const finishLine = relativeFinish - (135);
    let multiplier = 10;
    if (document.getElementById('raceTypeSelect').selectedIndex == HECTIC){
        multiplier = 20;
    }
    const maxSpeed = 5*multiplier/raceTime; // Maximum speed for the players
    const minSpeed = 1*multiplier/raceTime; // Minimum speed for the players

    // Store the current positions and their corresponding indices
    const currentPositions = players.map((_, index) => ({
        index,
        position: parseFloat(document.getElementsByClassName('player-container')[index].style.left) || 0
    }));
    players.forEach((player, index) => {
        if (!finished[index]) {
            const playerContainer = document.getElementsByClassName('player-container')[index]; // Select the container
            let position = currentPositions[index].position; // Get current left position

            switch(document.getElementById('raceTypeSelect').selectedIndex){
                case HECTIC:
                    speedChange = (Math.random() - 0.5) * 1;
                    break;
                default:
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
                    break;
            }
            
            speeds[index] = Math.max(minSpeed, Math.min(speeds[index] + speedChange, maxSpeed));
            position += speeds[index]; // Update position based on speed

            // Check for finish line
            if (position >= finishLine) {
                position = finishLine; // Stop at the adjusted finish line
                finished[index] = true; // Mark as finished
                finishedCount++;
                tempPlacements.push(player.name); // Add to placements
                const placement = finishedCount;
                const suffix = placement === 1 ? 'st' : placement === 2 ? 'nd' : placement === 3 ? 'rd' : 'th'; // Determine suffix
                const positionLabel = document.getElementsByClassName('player-container')[index].querySelector('.player-position-label');
                positionLabel.innerText = `${placement}${suffix}`; // Update position label

                // Race has finished
                if (tempPlacements.length === players.length) {
                    endRace(); 
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

function endRace() {
    toggleControls(true); // Show the controls
    if (!document.getElementById('battleRoyaleToggle').checked)
        {
            placements = tempPlacements.slice();
            showStandings();
            return;
        }
    let loser = tempPlacements[tempPlacements.length - 1];
    const playerIndex = players.findIndex(player => player.name === loser);
    placements.unshift(loser); // Add the loser to the start of the placements array

    
    if (playerIndex !== -1) {
        players.splice(playerIndex, 1); // Remove the player at the found index
        console.log(`Player ${loser} has been removed`);
    } else {
        console.log(`Player ${loser} not found`);
    }
    if (players.length == 1){
        showBattleControls(false);
        placements.unshift(tempPlacements[0]); // Add the loser to the start of the placements array
    }
    showStandings();
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
            let placement = index + 1; // Get placement (1st, 2nd, etc.)
            if (document.getElementById('battleRoyaleToggle').checked){
                placement += document.getElementById('numberOfPlayers').value - placements.length;
            }
            const suffix = placement === 1 ? 'st' : placement === 2 ? 'nd' : placement === 3 ? 'rd' : 'th'; // Determine suffix
            return `${placement}${suffix}: ${playerName}`; // Format the message
        }).join('\n'); // Join results with new lines

        navigator.clipboard.writeText(`Standings\n${resultMessage}`)
            .catch(err => {
                console.error('Failed to copy: ', err);
            });
    };

    const standingsList = placements.map((playerName, index) => {
        let placement = index + 1;
        if (document.getElementById('battleRoyaleToggle').checked){
            placement += document.getElementById('numberOfPlayers').value - placements.length;
        }
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
        controlsDiv.style.display = visible ? 'flex' : 'none'; // Show or hide based on the visible flag
    }
}

function showBattleControls(isTrue){
    let control = isTrue ? 'none' : 'flex';
    let battle = isTrue ? 'flex' : 'none';
    document.getElementById('playerListButton').style.display = control;
    document.getElementById('startButton').style.display = control;
    document.getElementById('nextButton').style.display = battle;
    document.getElementById('saveButton').style.display = control;
    document.getElementById('loadButton').style.display = control;
    document.getElementById('battleSection').style.display = control;
    document.getElementById('sportSection').style.display = control;
    document.getElementById('playerNumberSection').style.display = control;
}

function togglePlayerList(visible) {
    if (playerListContainer) {
        playerListContainer.style.display = visible ? 'block' : 'none'; // Show or hide based on the visible flag
    }
}

// Function to update the horizontal position of the finish line
function setFinishLinePosition() {
    const finishLine = document.querySelector('.finish-line');
    let TempPosition;
    switch(document.getElementById('sportSelect').selectedIndex){
        case BASKETBALL:
            TempPosition = window.innerWidth - window.innerWidth*85/1912;
            break;
        case FOOTBALL:
            TempPosition = window.innerWidth - window.innerWidth*215/1912;
            break;
        case HOCKEY:
            TempPosition = window.innerWidth - window.innerWidth*90/1912;
            break;
        case BASEBALL:
            TempPosition = window.innerWidth - window.innerWidth*450/1912;
            break;
    }
    const position = TempPosition;
    finishLine.style.left = `${position}px`; // Adjust finish line to the left by 20 pixels
    finishLine.style.right = ''; // Clear any right value, just in case
    finishLine.style.visibility = 'visible';
}

// Convert file to Base64
async function fileToBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
        reader.readAsDataURL(file);
    });
}

async function saveSettings() {
    // Gather player list data with Base64 image encoding
    const playerListData = [];

    for (let player of playerListContainer.children) {
        const name = player.querySelector('.player-name').value.trim();
        const imageFile = player.querySelector('.player-image').files[0];
        const backgroundColor = player.querySelector('.player-color').value;

        let image = null;
        if (imageFile) {
            image = await fileToBase64(imageFile); // Convert image to Base64
        }

        playerListData.push({ name, image, backgroundColor });
    }

    // Gather all settings data
    const settings = {
        players: playerListData,
        raceType: document.getElementById('raceTypeSelect').value,
        battleMode: document.getElementById('battleRoyaleToggle').checked,
        sport: document.getElementById('sportSelect').value,
        raceDuration: document.getElementById('raceTime').value,
        numberOfPlayers: document.getElementById('numberOfPlayers').value,
        musicFile: isSongSelected ? audio.src : null
    };

    try {
        // Use the file picker to allow the user to save the file where they want
        const fileHandle = await window.showSaveFilePicker({
            suggestedName: 'Race_Settings.json',
            types: [{
                description: 'JSON File',
                accept: { 'application/json': ['.json'] }
            }]
        });

        // Create a writable stream and write the settings to the file
        const writableStream = await fileHandle.createWritable();
        await writableStream.write(JSON.stringify(settings, null, 2));
        await writableStream.close();
        
        //alert(`Settings saved successfully!`);
    } catch (err) {
        console.error("Error saving settings:", err);
        //alert("Failed to save settings.");
    }
}

async function loadSettings() {
    try {
        // Open file picker for user to select a JSON file
        const [fileHandle] = await window.showOpenFilePicker({
            types: [{
                description: 'JSON Files',
                accept: { 'application/json': ['.json'] }
            }]
        });

        // Read and parse the file
        const file = await fileHandle.getFile();
        const fileContent = await file.text();
        const settings = JSON.parse(fileContent);

        // Apply loaded settings
        document.getElementById('raceTypeSelect').value = settings.raceType;
        document.getElementById('battleRoyaleToggle').checked = settings.battleMode;
        document.getElementById('sportSelect').value = settings.sport;
        document.getElementById('raceTime').value = settings.raceDuration;
        document.getElementById('numberOfPlayers').value = settings.numberOfPlayers;
        changeBackground();

        // Load players into the UI
        loadPlayerList(settings.players);

        // Load music if saved
        if (settings.musicFile) {
            audio.src = settings.musicFile;
            isSongSelected = true;
        }

        //alert(`Settings loaded successfully.`);
    } catch (error) {
        console.error("Error loading settings:", error);
        //alert("Failed to load settings.");
    }
}

function updatePlayerList(players) {
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
                    playerDiv.appendChild(nameInput);

                    const imageInput = document.createElement('input');
                    imageInput.type = 'file';
                    imageInput.accept = 'image/*'; // Accept any image type
                    imageInput.classList.add('player-image');
                    playerDiv.appendChild(imageInput);

                    playerDiv.loadedImage = null;

                    // Add background color input
                    const colorInput = document.createElement('input');
                    colorInput.type = 'color';
                    colorInput.value = players ? players[i].backgroundColor: getRandomColor(); // Assign random background color
                    colorInput.classList.add('player-color');
                    playerDiv.appendChild(colorInput);

                    if(players){
                        nameInput.value = players[i].name;
                        playerDiv.loadedImage = players[i].image;
                    }

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

function hideFinish(){
    document.querySelector('.finish-line').style.visibility = 'hidden';
}

// Function to show the error message with auto-hide
function showError(message, duration = 3000) {
    const errorPopup = document.getElementById('errorPopup');
    errorPopup.textContent = message;   // Set the error message
    errorPopup.style.display = 'block'; // Make the pop-up visible
    errorPopup.style.opacity = '1';     // Fade-in effect

    // Hide the pop-up after the specified duration
    setTimeout(() => {
        errorPopup.style.opacity = '0'; // Fade-out effect
        setTimeout(() => {
            errorPopup.style.display = 'none'; // Hide completely after fade-out
        }, 500); // Match this with the CSS transition duration
    }, duration);
}

function createControls() {
    const playerListButton = document.getElementById('playerListButton');
    const startButton = document.getElementById('startButton');
    const nextButton = document.getElementById('nextButton');
    nextButton.style.display = 'none';
    const standingsButton = document.getElementById('standingsButton');
    const loadMusicButton = document.getElementById('loadMusicButton');
    const saveButton = document.getElementById('saveButton');
    const loadButton = document.getElementById('loadButton');
    const musicFileInput = document.getElementById('musicFileInput');
    const sportSelect = document.getElementById('sportSelect');
    const raceTimeInput = document.getElementById('raceTime');
    const numberInput = document.getElementById('numberOfPlayers');
    hideFinish();
    
    // Listen for changes to the selected sport
    sportSelect.addEventListener('change', () => {
        changeBackground();
        refreshPlayerElements(false);
        hideFinish();
    });

    let visible = true;
    // Event Listeners for buttons
    playerListButton.addEventListener('click', () => {
      togglePlayerList(visible);
      visible = !visible;
    });
  
    startButton.addEventListener('click', () => {
      if (!raceTimeInput.value){
        showError("Please enter a race time before starting the race.");
        return;
      }
      if (!numberInput.value){
        showError("Please enter the amount of players before starting the race.");
        return;
      }
      const playerDivs = document.querySelectorAll('.player-input');
      const sportIndex = document.getElementById('sportSelect').selectedIndex;
      players = [];
      playerDivs.forEach((div) => {
        const nameInput = div.querySelector('.player-name');
        const imageInput = div.querySelector('.player-image');
        const colorInput = div.querySelector('.player-color');
        const name = nameInput.value.trim();
        const imageFile = imageInput.files[0];
        const defaultImage = imageFile ? URL.createObjectURL(imageFile) : imageRoot + defaultPlayerImage[sportSelect.selectedIndex];
        const image = div.loadedImage ? div.loadedImage : defaultImage;
        const backgroundColor = colorInput.value || getRandomColor();
        players.push({
          name: name || getRandomName(sportIndex),
          image,
          backgroundColor
        });
      });

      if (document.getElementById('battleRoyaleToggle').checked){
        showBattleControls(true);
      }

      placements.length = 0; // Clear previous placements

      // Update the audio source based on the selected index
      /*if(!isSongSelected){
        const defaultSongPath = musicRoot + songs[document.getElementById('sportSelect').selectedIndex];
        audio.src = defaultSongPath;
      }*/

      //Restart and play music
      audio.load();
      audio.play().catch(error => {
        showError("An error occurred while trying to play the audio. Please try another file.");
        console.error("Error during audio playback:", error);
    });

      startRace();
    });

    raceTimeInput.addEventListener('input', () => {
        if (raceTimeInput.value == '0') {
            raceTimeInput.value = '1';
        }
        else if (!raceTimeInput.value){
            raceTimeInput.style.backgroundColor = "red";
            return;
        }
        raceTimeInput.style.backgroundColor = ""; // Reset to default
    });

    numberInput.addEventListener('input', () => {
        if (numberInput.value == '0') {
            numberInput.value = prevPlayerCount;
        }
        else if (!numberInput.value){
            numberInput.style.backgroundColor = "red";
            return;
        }
        numberInput.style.backgroundColor = ""; // Reset to default
        updatePlayerList();
    });

    loadMusicButton.addEventListener('click', () => {
      musicFileInput.click();
    });
  
    musicFileInput.addEventListener('change', () => {
      const file = musicFileInput.files[0];
      if (file) {
        audio.src = URL.createObjectURL(file);
        isSongSelected = true;
      }
    });
  
    nextButton.addEventListener('click', startRace);
    standingsButton.addEventListener('click', showStandings);
    saveButton.addEventListener('click', saveSettings);
    loadButton.addEventListener('click', loadSettings);
  }  

// Initialize UI
function initializeUI() {
    // Create controls and player inputs once
    if (!document.getElementById('controls')) {
        createControls();
        changeBackground();
    }
    // Create player inputs div (player list) only once
    if (!document.getElementById('playerInputs')) {
        createPlayerListContainer();
        updatePlayerList();
    }
}

// Start the application
initializeUI();