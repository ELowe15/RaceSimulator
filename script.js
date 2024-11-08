const basketballnames = [
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

const hockeyNames = [
    "McDavid", "Crosby", "Ovechkin", "MacKinnon", "Draisaitl",
    "Matthews", "Panarin", "Kane", "Stamkos", "Eichel",
    "Marchand", "Hedman", "Stone", "Pastrnak", "Josi",
    "Tavares", "Kopitar", "Aho", "Marner", "Toews",
    "Makar", "Hughes", "McAvoy", "O'Reilly", "Barzal",
    "Point", "Heiskanen", "Hellebuyck", "Price", "Hamilton",
    "Gaudreau", "Connor", "Hertl", "Voracek", "Svechnikov",
    "Malkin", "Nylander", "Pettersson", "Forsberg", "Scheifele",
    "Tkachuk", "Huberdeau", "Landeskog", "Subban", "Letang",
    "Benn", "Dubois", "Wheeler", "Bergeron", "Pavelski",
    "Giroux", "Tarasenko", "Kucherov", "Fox", "Reinhart",
    "Boeser", "Ekblad", "Getzlaf", "Doughty", "Giordano",
    "Smith", "Lindholm", "Anderson", "Nugent-Hopkins", "Larkin",
    "Carter", "Lafreniere", "Holtz", "Byram", "Zegras",
    "Robertson", "Batherson", "DeBrincat", "Hintz", "Dobson",
    "Suzuki", "Necas", "Kravtsov", "Tolvanen", "Bean",
    "Steen", "Bishop", "Talbot", "Parise", "Gallagher",
    "Chabot", "Spurgeon", "Rielly", "Chychrun", "Lundell",
    "Jarry", "Lankinen", "Shesterkin", "Sarros", "Raanta"
];

const footballNames = [
    "Brady", "Mahomes", "Rodgers", "Jackson", "Wilson",
    "Barkley", "Henry", "McCaffrey", "Kamara", "Cook",
    "Adams", "Hopkins", "Diggs", "Hill", "Jones",
    "Kittle", "Kelce", "Waller", "Smith", "Murray",
    "Watson", "Allen", "Garoppolo", "Goff", "Herbert",
    "Mixon", "Carson", "Chubb", "Hunt", "Jacobs",
    "Gordon", "Taylor", "Swift", "Ekeler", "Fournette",
    "Robinson", "Sanders", "Johnson", "Montgomery", "Brown",
    "Metcalf", "Godwin", "Evans", "Thielen", "Fuller",
    "Landry", "Jeudy", "Anderson", "Parker", "Moore",
    "Higgins", "Claypool", "Smith-Schuster", "Shenault", "Samuel",
    "Henry", "Davis", "Williams", "Boyd", "Gage",
    "White", "Akers", "Moss", "Jones", "Pollard",
    "Harris", "Scott", "Wilson", "Drake", "Patterson",
    "Golladay", "Allen", "Cobb", "Sanders", "Beasley",
    "Newton", "Love", "Stafford", "Fitzpatrick", "Tannehill",
    "Watson", "Burrow", "Smith", "Hurst", "Meyers",
    "Newton", "Bridgewater", "Tagovailoa", "Wentz", "Cousins",
    "Hurts", "Lawrence", "Fields", "Wilson", "Prescott"
];

const baseballNames = [
    "Trout", "Betts", "Arenado", "Lindor", "Yelich",
    "Harper", "Machado", "Bellinger", "Acuna", "Freeman",
    "Altuve", "Judge", "Springer", "Martinez", "Bryant",
    "Goldschmidt", "Rizzo", "Soto", "Seager", "Arenado",
    "Ramirez", "Correa", "Bregman", "Turner", "Guerrero",
    "Cole", "Kershaw", "Scherzer", "Bauer", "deGrom",
    "Snell", "Gray", "Nola", "Paddack", "Lynn",
    "Darvish", "Giolito", "Gallen", "Flaherty", "Hader",
    "Chapman", "Hendriks", "Yates", "Iglesias", "Hand",
    "Rosenthal", "Pressly", "Diekman", "Williams", "Hudson",
    "Pham", "Kiermaier", "Hicks", "Conforto", "Castellanos",
    "Ozuna", "Merrifield", "Soler", "Marte", "Blackmon",
    "Gallo", "Grisham", "McNeil", "Canha", "Mullins",
    "Brantley", "Verdugo", "Benintendi", "Pence", "Upton",
    "Myers", "Calhoun", "Reyes", "Martinez", "Santander",
    "Schwarber", "Davis", "Duvall", "Smoak", "Gonzalez",
    "Pujols", "Abreu", "Lowe", "Senzel", "Encarnacion",
    "Alvarez", "Sano", "Diaz", "Mountcastle", "Anderson",
    "Luzardo", "Urias", "May", "Gonzales", "Wheeler"
];

const names = [basketballnames,footballNames,hockeyNames,baseballNames];

const BASKETBALL = 0;
const FOOTBALL = 1;
const HOCKEY = 2;
const BASEBALL = 3;

// Default player and background images (dynamic references)
const defaultPlayerImage = ['bballHollow.png', 'fballHollow.png','puck.png', 'baseballHollow.png']; // Default to bball.png
const backgroundImage = ['bball_court.jpg', 'fball_field.jpg', 'rink.jpg','baseball_diamond.jfif']; // Change file extension as needed
const songs = ['basketball.mp4', 'NFLonFox.mp4', 'HockeyNight.mp4', 'shipping.mp4']
let audio = new Audio();
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
    let selectedIndex = document.getElementById('sportSelect').selectedIndex;
    return names[selectedIndex][Math.floor(Math.random() * names[selectedIndex].length)];
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

function refreshPlayerElements(){
    const playerContainers = document.querySelectorAll('.player-container');
    playerContainers.forEach((playerContainer) => playerContainer.remove());
    players.forEach((player, index) => createPlayerElement(player, index));
}

// Start the race
function startRace() {
    refreshPlayerElements();
    toggleControls(false); // Hide the controls
    togglePlayerList(false);
    deleteStandings();
    raceTime = parseInt(document.getElementById('raceTime').value, 10);
    finishedCount = 0;
    tempPlacements.length = 0; // Clear previous placements
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
                tempPlacements.push(player.name); // Add to placements
                const placement = finishedCount;
                const suffix = placement === 1 ? 'st' : placement === 2 ? 'nd' : placement === 3 ? 'rd' : 'th'; // Determine suffix
                const positionLabel = document.getElementsByClassName('player-container')[index].querySelector('.player-position-label');
                positionLabel.innerText = `${placement}${suffix}`; // Update position label
                console.log(`${player.name} has finished!`);

                // Show the placements when all players have finished
                if (tempPlacements.length === players.length) {
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

function endRace() {
    toggleControls(true); // Show the controls
    if (!document.getElementById('battleRoyaleToggle').checked)
        {
            placements = tempPlacements;
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
            console.log(document.getElementById('battleRoyaleToggle').checked);
            let placement = index + 1; // Get placement (1st, 2nd, etc.)
            if (document.getElementById('battleRoyaleToggle').checked){
                placement += document.getElementById('numberOfPlayers').value - placements.length;
                console.log(placement);
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
            console.log(placement);
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
        controlsDiv.style.display = visible ? 'block' : 'none'; // Show or hide based on the visible flag
    }
}

function showBattleControls(isTrue){
    let control;
    let battle;
    isTrue === false ? (control = 'inline-block', battle = 'none') : (control = 'none', battle = 'inline-block');
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
                    //nameInput.value = getRandomName(); // Assign a random name
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
                        //console.log(players[i].textContent);
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
    const battleRoyaleToggle = document.getElementById('battleRoyaleToggle');
    const raceTypeSelect = document.getElementById('raceTypeSelect');
    const sportSelect = document.getElementById('sportSelect');
    const raceTimeInput = document.getElementById('raceTime');
    const numberInput = document.getElementById('numberOfPlayers');
  
    let visible = true;
    // Event Listeners for buttons
    playerListButton.addEventListener('click', () => {
      togglePlayerList(visible);
      visible = !visible;
    });
  
    startButton.addEventListener('click', () => {
      const playerDivs = document.querySelectorAll('.player-input');
      players = [];
      playerDivs.forEach((div) => {
        const nameInput = div.querySelector('.player-name');
        const imageInput = div.querySelector('.player-image');
        const colorInput = div.querySelector('.player-color');
        const name = nameInput.value.trim();
        const imageFile = imageInput.files[0];
        const defaultImage = imageFile ? URL.createObjectURL(imageFile) : defaultPlayerImage[sportSelect.selectedIndex];
        const image = div.loadedImage ? div.loadedImage : defaultImage;
        const backgroundColor = colorInput.value || getRandomColor();
        players.push({
          name: name || getRandomName(),
          image,
          backgroundColor
        });
      });
  
      // Ensure the number of players matches the input
      while (players.length < parseInt(numberInput.value)) {
        players.push(createPlayer(getRandomName(), defaultPlayerImage[sportSelect.selectedIndex], getRandomColor()));
      }

      if (document.getElementById('battleRoyaleToggle').checked){
        showBattleControls(true);
      }
      placements.length = 0; // Clear previous placements
      // Update the audio source based on the selected index
      if(!isSongSelected){
          audio.src = songs[document.getElementById('sportSelect').selectedIndex];
      }
      audio.load();
      //Restart and play music
      audio.pause();         // Pause the music
      audio.currentTime = 0; // Reset the music to the beginning
      audio.play();
      startRace();
    });

    raceTimeInput.addEventListener('input', () => {
        if (raceTimeInput.value == 0) {
            raceTimeInput.value = '1';
        }
    });

    numberInput.addEventListener('input', () => {
        if (numberInput.value == 0) {
            numberInput.value = prevPlayerCount;
        }
        updatePlayerList();
    });

    nextButton.addEventListener('click', startRace);
  
    standingsButton.addEventListener('click', showStandings);
  
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
  
    saveButton.addEventListener('click', saveSettings);
    loadButton.addEventListener('click', loadSettings);
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