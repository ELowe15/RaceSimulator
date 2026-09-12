// Paths for race assets
const imageRoot = 'Images/';

// Default player and background images (dynamic references)
const defaultPlayerImage = ['bballHollow.png', 'fball.png','puck.png', 'baseballHollow.png']; // Default to bball.png
const backgroundImage = ['bball_court.jpg', 'fball_field.jpg', 'rink.jpg','diamond.png']; // Change file extension as needed

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
const raceOrchestrator = new RaceOrchestrator();

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

	sportSelect.addEventListener('change', () => {
		changeBackground();
		const sportIndex = sportSelect.selectedIndex;
		document.querySelectorAll('.player-input').forEach((div) => {
			div.querySelector('.place-holder').textContent = getRandomName(sportIndex);
		});
		buildPlayerElements();
		setFinishLinePosition();
	});

	playerListButton.addEventListener('click', () => togglePlayerList());

	startButton.addEventListener('click', () => {
		if (!raceTimeInput.value) {
			showError('Please enter a race time before starting the race.');
			return;
		}
		if (!numberInput.value) {
			showError('Please enter the amount of players before starting the race.');
			return;
		}

		if (document.getElementById('battleRoyaleToggle').checked) {
			showBattleControls(true);
		}

		placements.length = 0;
		raceOrchestrator.handleStartRaceWithRecording();
	});

	raceTimeInput.addEventListener('input', () => inputCheck(raceTimeInput));
	raceTimeInput.addEventListener('wheel', (event) => {
		event.preventDefault();
		const currentValue = parseInt(raceTimeInput.value) || 0;
		raceTimeInput.value = event.deltaY < 0 ? currentValue + 1 : currentValue - 1;
		inputCheck(raceTimeInput);
	});

	numberInput.addEventListener('input', () => {
		inputCheck(numberInput);
		updatePlayerList();
		buildPlayerElements();
	});

	numberInput.addEventListener('wheel', (event) => {
		event.preventDefault();
		const currentValue = parseInt(numberInput.value) || 0;
		numberInput.value = event.deltaY < 0 ? currentValue + 1 : currentValue - 1;
		inputCheck(numberInput);
		updatePlayerList();
		buildPlayerElements();
	});

	loadMusicButton.addEventListener('click', () => musicFileInput.click());
	musicFileInput.addEventListener('change', () => {
		const file = musicFileInput.files[0];
		if (file) {
			audio.src = URL.createObjectURL(file);
			isSongSelected = true;
		}
	});

	nextButton.addEventListener('click', () => raceOrchestrator.startRace());
	standingsButton.addEventListener('click', showStandings);
	saveButton.addEventListener('click', saveSettings);
	loadButton.addEventListener('click', loadSettings);
}

function initializeUI() {
	createControls();
	changeBackground();
	createPlayerListContainer();
	updatePlayerList();
	buildPlayerElements();
	setFinishLinePosition();
	adjustToggles();

	window.addEventListener('resize', () => {
		buildPlayerElements();
		setFinishLinePosition();
		adjustToggles();
	});
}

initializeUI();