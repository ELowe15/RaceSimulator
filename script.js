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
 * Functions:
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
const defaultPlayerImage = ['bballHollow.png', 'fball.png','puck.png', 'baseballHollow.png']; // Default to bball.png
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
let listVisible = false;

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
        
        // Create the title element
        const title = document.createElement('h2');
        title.textContent = 'Player List';
        title.classList.add('player-list-title'); // Add the CSS class

        const playerListContent = document.getElementById('playerListContent');
        playerListContent.addEventListener('change', buildPlayerElements);

        const closePlayer = document.createElement('button');
        // Add text content to the button
        closePlayer.textContent = 'Close';
        closePlayer.className = 'close-button';
        closePlayer.addEventListener('click', togglePlayerList);


        playerListContainer.appendChild(title);
        playerListContainer.appendChild(playerListContent);
        playerListContainer.appendChild(closePlayer);

        document.body.appendChild(playerListContainer); // Append to the body or a specific section
    }
}

// Function to populate player list with given player data
function loadPlayerList(players){
    document.getElementById('playerListContent').innerHTML = '';  // Clear the container
    prevPlayerCount = 0;
    updatePlayerList(players);
    buildPlayerElements();
}

function adjustNameLabel(playerDiv) {
    const nameLabel = playerDiv.querySelector('.player-name-label');
    const playerImageDiv = playerDiv.querySelector('.player');
    const IconDiv = playerDiv.querySelector('.icon-container');

    // Get widths of the name label and the player image
    const nameLabelWidth = nameLabel.offsetWidth;
    const playerWidth = playerImageDiv.offsetWidth;

    if (nameLabelWidth >= playerWidth) {
        // Align the label to the left and let it expand to the right
        IconDiv.style.alignItems = 'flex-start';
    }
}

// Create player element including a color picker for background color
function createPlayerElement(player, index) {
    const playerDiv = document.createElement('div');
    playerDiv.classList.add('player-container');
    playerDiv.style.position = 'absolute'; // Position the entire container absolutely

    const IconDiv = document.createElement('div');
    IconDiv.classList.add('icon-container');

    // Create a position label
    const positionLabel = document.createElement('div');
    positionLabel.classList.add('player-position-label');
    positionLabel.innerText = `${index + 1}`; // Set position (will update in the race)
    
    // Create a name label
    const nameLabel = document.createElement('div');
    nameLabel.classList.add('player-name-label');
    nameLabel.innerText = player.name;
    //nameLabel.style.fontSize = '1.2vw';

    // Create a player image div
    const playerImageDiv = document.createElement('div');
    playerImageDiv.classList.add('player');
    playerImageDiv.style.backgroundImage = `url('${player.image}')`;
    playerImageDiv.style.backgroundColor = player.backgroundColor; // Set the background color
    //playerImageDiv.style.left = '0px'; // Starting position
    
    // Get the viewport height in pixels and round down. Decimal values cause visual issues
    const viewportHeight = window.innerHeight;
    const playerSize = Math.floor(viewportHeight*10/100);
    playerDiv.setAttribute('data-player-size', playerSize);

    playerImageDiv.style.width = `${playerSize}px`
    playerImageDiv.style.height = playerImageDiv.style.width;

    playerDiv.appendChild(positionLabel); // Add position label to the left
    IconDiv.appendChild(nameLabel); // Add name label above image
    IconDiv.appendChild(playerImageDiv); // Add image below name
    playerDiv.appendChild(IconDiv); // Add position label to the left

    const totalPlayers = players.length;
    const BottomOffset = Math.ceil(playerSize);
    const spacing = (viewportHeight - BottomOffset) / (totalPlayers + 1); // Ensure spacing doesn't exceed a maximum

    playerDiv.style.top = `${(index + 1) * spacing}px`; // Space players vertically
    // Clamp the position to ensure it fits within the window

    document.body.appendChild(playerDiv);
    // Dynamically adjust name label position
    adjustNameLabel(playerDiv);

    return playerDiv;
}

function refreshPlayerElements(create){
    const playerContainers = document.querySelectorAll('.player-container');
    playerContainers.forEach((playerContainer) => playerContainer.remove());
    if (create){
        players.forEach((player, index) => createPlayerElement(player, index));
    } 
}
function buildPlayerElements(){
    const playerDivs = document.querySelectorAll('.player-input');
    const sportIndex = document.getElementById('sportSelect').selectedIndex;
    players = [];
    playerDivs.forEach((div) => {
        const nameInput = div.querySelector('.player-name');
        const randomPlaceHolder = div.querySelector('.place-holder');
        const imageInput = div.querySelector('.player-image');
        const colorInput = div.querySelector('.player-color');
        const name = nameInput.value.trim();
        const imageFile = imageInput.files[0];
        const defaultImage = imageFile ? URL.createObjectURL(imageFile) : imageRoot + defaultPlayerImage[sportSelect.selectedIndex];
        const image = div.loadedImage ? div.loadedImage : defaultImage;
        const backgroundColor = colorInput.value || getRandomColor();
        players.push({
            name: name || randomPlaceHolder.textContent,
            image,
            backgroundColor
            });
    });
    refreshPlayerElements(true);
}

async function handleStartRaceWithRecording() {
    if (document.getElementById("recordToggle").checked) {
        await startRecording();
        // Add delay to let the recording buffer initialize
        await new Promise(resolve => setTimeout(resolve, 500));  // 1000 ms = 1 second
    }

    // Restart and play music
    if (audio.src) {
        audio.load();
        audio.play().catch(error => {
            showError("An error occurred while trying to play the audio. Please try another file.");
            console.error("Error during audio playback:", error);
        });
    }

    startRace();  // Your main race function
}

// Start the race
function startRace() {
    refreshPlayerElements(true);
    toggleControls(false); // Hide the controls
    togglePlayerList(true);
    showStandings(false);
    setFinishLinePosition();
    raceTime = parseInt(document.getElementById('raceTime').value, 10);
    finishedCount = 0;
    tempPlacements.length = 0; // Clear previous placements
    speeds = [];
    finished = [];
    
    const maxSpeed = 5*10/raceTime; // Maximum speed for the players
    const trackLength = parseInt(document.querySelector('.finish-line1').style.left, 10); // Total distance for the race

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
    const relativeFinish = parseInt(document.querySelector('.finish-line1').style.left, 10);
    const playerDiv = document.getElementsByClassName('player-container')[0];
    const playerSize = parseFloat(playerDiv.getAttribute('data-player-size'));
    const labelSize = parseFloat(window.getComputedStyle(document.querySelector('.player-position-label')).width);
    const finishLine = relativeFinish - (playerSize + labelSize);

    let multiplier = 10*window.innerWidth/1917;
    let tempMaxSpeed = 5*multiplier/raceTime; // Maximum speed for the players
    let tempMinSpeed = 1*multiplier/raceTime; // Minimum speed for the players

    const sport = document.getElementById('raceTypeSelect').selectedIndex;
    if (sport == HECTIC){
        tempMaxSpeed = tempMaxSpeed*2/1.5;
        tempMinSpeed = tempMinSpeed/1.5;
    }
    else if (sport == CLOSE){
        tempMaxSpeed = tempMaxSpeed/1.2;
        tempMinSpeed = tempMinSpeed/1.2;
    }
    const maxSpeed = tempMaxSpeed; // Maximum speed for the players
    const minSpeed = tempMinSpeed; // Minimum speed for the players

    // Store the current positions and their corresponding indices
    const currentPositions = players.map((_, index) => ({
        index,
        position: parseFloat(document.getElementsByClassName('player-container')[index].style.left) || 0
    }));
    players.forEach((player, index) => {
        if (!finished[index]) {
            const playerContainer = document.getElementsByClassName('player-container')[index]; // Select the container
            let position = currentPositions[index].position; // Get current left position

            const remainingPlayers = currentPositions.filter((_, index) => !finished[index]); // Get players who haven't finished
            const totalPlayers = remainingPlayers.length;
            const sortedPositions = remainingPlayers.sort((a, b) => b.position - a.position); // Sort based on position
            const rank = sortedPositions.findIndex(player => player.index === index);
            //console.log("players" + totalPlayers);
            //console.log("rank" + rank);

            switch(document.getElementById('raceTypeSelect').selectedIndex){
                case CLOSE:    
                    // A chance for players to speed up or slow down relative to their position unless they are the only one left
                    if ((Math.random() < 0.04) && totalPlayers != 1) { 
                        // Calculate the scaleFactor between -1 and 1
                        const scaleFactor = ((rank - (totalPlayers - 1) / 2) / ((totalPlayers - 1) / 2));
                        speedChange = (Math.random() + scaleFactor) * 0.5; // Proportional boost
                    } else {
                        speedChange = (Math.random() - 0.5) * 0.5;
                    }
                    break;
                case HECTIC:
                    if (Math.random() < 0.02){
                        speedChange = -maxSpeed/2;
                    }
                    else if (Math.random() > 0.98){
                        speedChange = maxSpeed/2;
                    }
                    else{
                        speedChange = (Math.random() - 0.5) * 1;
                    }
                    break;
                default: //BALANCED
                    const oddsMult = 4 //Lower number means higher discrepency odds depending on rank
                    const rankFactor = Math.trunc(Math.abs((rank - (totalPlayers - 1) / 2) / ((totalPlayers - 1) / 2)) * oddsMult);
                    //console.log(rankFactor);
                    // Determines the odds of addtional speed boost or slow
                    const lucky1 = Math.floor(Math.random() * rankFactor) % oddsMult; 
                    const lucky2 = Math.floor(Math.random() * rankFactor) % oddsMult;
                    const lucky3 = Math.random() < 0.15;
                    const isLucky = lucky1 && lucky2 && lucky3;

                    // Bottom third of racers
                    if ((rank >= 2*totalPlayers/3) && isLucky) {
                        speedChange = Math.random() * 0.5;
                    }
                    // Top third of racers
                    else if ((rank <= totalPlayers/3) && isLucky) {
                        speedChange = (Math.random() - 1) * 0.5
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
    const remainingPlayers = currentPositions.filter((_, index) => !finished[index]); // Get players who haven't finished
    const sortedPositions = remainingPlayers.sort((a, b) => b.position - a.position); // Sort based on position

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
            stopRecording();
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
        showStandings();
        stopRecording();
        return;
    }
    showStandings();
}

function showStandings(show = true) {
    
    const standingsDiv = document.getElementById('standingsDiv');
    if ((standingsDiv.style.visibility === 'visible') || !show) {
        standingsDiv.style.visibility = 'hidden'; // Hide if already visible
        return;
    }

    // Display and update standings
    const standingsContent = document.getElementById('standingsContent');

    // Generate standings list
    standingsContent.innerHTML = placements.map((playerName, index) => {
        let placement = index + 1;
        if (document.getElementById('battleRoyaleToggle').checked) {
            placement += document.getElementById('numberOfPlayers').value - placements.length;
        }
        const suffix = placement === 1 ? 'st' : placement === 2 ? 'nd' : placement === 3 ? 'rd' : 'th';
        return `<p>${placement}${suffix}: ${playerName}</p>`;
    }).join('');

    // Copy standings to clipboard
    document.getElementById('copyButton').onclick = () => {
        const resultMessage = placements.map((playerName, index) => {
            let placement = index + 1;
            if (document.getElementById('battleRoyaleToggle').checked) {
                placement += document.getElementById('numberOfPlayers').value - placements.length;
            }
            const suffix = placement === 1 ? 'st' : placement === 2 ? 'nd' : placement === 3 ? 'rd' : 'th';
            return `${placement}${suffix}: ${playerName}`;
        }).join('\n');
        
        navigator.clipboard.writeText(`Standings\n${resultMessage}`)
            .catch(err => {
                console.error('Failed to copy: ', err);
                showError("Failed to copy");
                
            });
    };

    // Close standings
    document.getElementById('closeButton').onclick = () => {
        standingsDiv.style.visibility = 'hidden';
    };
    standingsDiv.style.visibility = 'visible';
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

function togglePlayerList(invisible) {
    if (playerListContainer) {
        if (invisible){
            listVisible = false;
            playerListContainer.style.display = 'none';
          }
        else{
            playerListContainer.style.display = listVisible ? 'none' : 'flex'; // Show or hide based on the visible flag
            listVisible = !listVisible;
        }
    }
}

// Function to update the horizontal position of the finish line
function setFinishLinePosition() {
    const finishLine1 = document.querySelector('.finish-line1');
    const finishLine2 = document.querySelector('.finish-line2');

    let TempPosition;
    switch(document.getElementById('sportSelect').selectedIndex){
        case BASKETBALL:
            TempPosition = window.innerWidth*1822/1912;
            break;
        case FOOTBALL:
            TempPosition = window.innerWidth*1697/1912;
            break;
        case HOCKEY:
            TempPosition = window.innerWidth*1822/1912;
            break;
        case BASEBALL:
            TempPosition = window.innerWidth*1462/1912;
            break;
    }
    const position = TempPosition;
    finishLine1.style.left = `${position}px`; 
    finishLine1.style.right = ''; // Clear any right value, just in case
    finishLine1.style.visibility = 'visible';
    const computedStyle = window.getComputedStyle(finishLine2);
    const finishLineWidth = parseFloat(computedStyle.width);
    finishLine2.style.left = `${position + finishLineWidth}px`; // Adjust finish to right of other line
    finishLine2.style.right = ''; // Clear any right value, just in case
    finishLine2.style.visibility = 'visible';
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
    const playerListContent = document.getElementById('playerListContent');

    for (let player of playerListContent.children) {
        
        const name = player.querySelector('.player-name').value.trim();
        const imageFile = player.querySelector('.player-image').files[0];
        const imageName = player.querySelector('.file-name-display').textContent;
        const backgroundColor = player.querySelector('.player-color').value;

        let image = null;
        if (imageFile) {
            image = await fileToBase64(imageFile); // Convert image to Base64
        }

        playerListData.push({ name, image, imageName, backgroundColor });
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
        showError("Failed to save settings.");
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
        showError("Failed to load settings.");
    }
}

function updatePlayerList(players) {
    if (document.getElementById('numberOfPlayers')){
        const numberInput = document.getElementById('numberOfPlayers');
        const numPlayers = parseInt(numberInput.value, 10);
        const playerListContent = document.getElementById('playerListContent');
            if (numPlayers > prevPlayerCount) {
                for (let i = prevPlayerCount; i < numPlayers; i++) {
                    const playerDiv = document.createElement('div');
                    playerDiv.classList.add('player-input');

                    const nameInput = document.createElement('input');
                    nameInput.placeholder = `Player ${i + 1} Name`;
                    nameInput.classList.add('player-name');

                    const randomPlaceHolder = document.createElement('label');
                    randomPlaceHolder.textContent = getRandomName(document.getElementById('sportSelect').selectedIndex);
                    randomPlaceHolder.classList.add('place-holder');

                    // Create the file input element
                    const imageInput = document.createElement('input');
                    imageInput.type = 'file';
                    imageInput.accept = 'image/*'; // Accept only image files
                    imageInput.classList.add('player-image');
                    // Hide the actual file input, since a a custom button is
                    imageInput.style.display = 'none';

                    // Create a custom button
                    const customButton = document.createElement('button');
                    customButton.textContent = 'Choose Image'; // Button text
                    customButton.style.color = 'white'; // Style button text color
                    customButton.classList.add('custom-file-button');

                    // Create a label to show the chosen file name
                    const fileNameDisplay = document.createElement('span');
                    fileNameDisplay.textContent = players ? players[i].imageName: 'No file chosen'; // Initial text when no file is selected
                    fileNameDisplay.classList.add('file-name-display');

                    // Append the file input and label to the player div
                    playerDiv.appendChild(nameInput);
                    playerDiv.appendChild(randomPlaceHolder);
                    playerDiv.appendChild(customButton);
                    playerDiv.appendChild(fileNameDisplay);
                    playerDiv.appendChild(imageInput);

                    // Add event listener to the button to trigger the file input
                    customButton.addEventListener('click', () => {
                        imageInput.click();
                    });

                    // Handle file selection
                    imageInput.addEventListener('change', (event) => {
                        const file = event.target.files[0];
                        if (file) {
                            fileNameDisplay.textContent = file.name; // Show the selected file name
                            playerDiv.loadedImage = null;
                        } else {
                            fileNameDisplay.textContent = 'No file chosen'; // If no file selected, show this text
                        }
                    });

                    // Append the player div to the body or your desired container
                    document.body.appendChild(playerDiv);

                    // Store the loaded image (if needed)
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

                    playerListContent.appendChild(playerDiv);
                }
            }
            else if (numPlayers == 0){
                return;
            }
            else if (numPlayers < prevPlayerCount){
                for (let i = prevPlayerCount - 1; i >= numPlayers; i--) {
                    playerListContent.removeChild(playerListContent.children[i]);
                }
            }
            if (numPlayers){
                prevPlayerCount = numPlayers;
            }
        }
}

function hideFinish(){
    document.querySelector('.finish-line1').style.visibility = 'hidden';
    document.querySelector('.finish-line2').style.visibility = 'hidden';
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

function inputCheck(input){
    if (parseInt(input.value) <= 0) {
        input.value = '1';
    }
    else if (!input.value){
        input.style.backgroundColor = "red";
        return;
    }
    input.style.backgroundColor = ""; // Reset to default
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
    
    // Listen for changes to the selected sport
    sportSelect.addEventListener('change', () => {
        changeBackground();
        const playerDivs = document.querySelectorAll('.player-input');
        const sportIndex = document.getElementById('sportSelect').selectedIndex;
        players = [];
        playerDivs.forEach((div) => {
            div.querySelector('.place-holder').textContent = getRandomName(sportIndex);
        });
        buildPlayerElements();
        setFinishLinePosition();
    });

    // Event Listeners for buttons
    playerListButton.addEventListener('click', () => {
      togglePlayerList();
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

      if (document.getElementById('battleRoyaleToggle').checked){
        showBattleControls(true);
      }

      placements.length = 0; // Clear previous placements

      // Update the audio source based on the selected index
      /*if(!isSongSelected){
        const defaultSongPath = musicRoot + songs[document.getElementById('sportSelect').selectedIndex];
        audio.src = defaultSongPath;
      }*/

       handleStartRaceWithRecording();
    });

    raceTimeInput.addEventListener('input', () => {
        inputCheck(raceTimeInput);
    });

    // Add a scroll event listener
    raceTimeInput.addEventListener('wheel', (event) => {
        event.preventDefault(); // Prevent the page from scrolling

        // Determine the current value of the input
        let currentValue = parseInt(raceTimeInput.value) || 0;

        // Adjust the value based on the scroll direction
        if (event.deltaY < 0) {
            // Scrolling up: increment the value
            raceTimeInput.value = currentValue + 1;
        } else {
            // Scrolling down: decrement the value
            raceTimeInput.value = currentValue - 1;
        }
        inputCheck(raceTimeInput);
    });

    numberInput.addEventListener('input', () => {
        inputCheck(numberInput);
        updatePlayerList();
        buildPlayerElements();
    });


    // Add a scroll event listener
    numberInput.addEventListener('wheel', (event) => {
        event.preventDefault(); // Prevent the page from scrolling

        // Determine the current value of the input
        let currentValue = parseInt(numberInput.value) || 0;

        // Adjust the value based on the scroll direction
        if (event.deltaY < 0) {
            // Scrolling up: increment the value
            numberInput.value = currentValue + 1;
        } else {
            // Scrolling down: decrement the value
            numberInput.value = currentValue - 1;
        }
        inputCheck(numberInput);
        updatePlayerList();
        buildPlayerElements();
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
        buildPlayerElements();
        setFinishLinePosition();
    }
}

// Start the application
initializeUI();

window.addEventListener('resize', () => {
    buildPlayerElements();
    setFinishLinePosition();
});