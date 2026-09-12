// Convert a file to a Base64 data URL for persistence in the settings file.
async function fileToBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
        reader.readAsDataURL(file);
    });
}

async function saveSettings() {
    const playerListData = [];
    const playerListContent = document.getElementById('playerListContent');

    for (let player of playerListContent.children) {
        const name = player.querySelector('.player-name').value.trim();
        const imageFile = player.querySelector('.player-image').files[0];
        const imageName = player.querySelector('.file-name-display').textContent;
        const backgroundColor = player.querySelector('.player-color').value;

        let image = null;
        if (imageFile) {
            image = await fileToBase64(imageFile);
        }

        playerListData.push({ name, image, imageName, backgroundColor });
    }

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
        const fileHandle = await window.showSaveFilePicker({
            suggestedName: 'Race_Settings.json',
            types: [{
                description: 'JSON File',
                accept: { 'application/json': ['.json'] }
            }]
        });

        const writableStream = await fileHandle.createWritable();
        await writableStream.write(JSON.stringify(settings, null, 2));
        await writableStream.close();
    } catch (err) {
        console.error("Error saving settings:", err);
        showError("Failed to save settings.");
    }
}

async function loadSettings() {
    try {
        const [fileHandle] = await window.showOpenFilePicker({
            types: [{
                description: 'JSON Files',
                accept: { 'application/json': ['.json'] }
            }]
        });

        const file = await fileHandle.getFile();
        const fileContent = await file.text();
        const settings = JSON.parse(fileContent);

        document.getElementById('raceTypeSelect').value = settings.raceType;
        document.getElementById('battleRoyaleToggle').checked = settings.battleMode;
        document.getElementById('sportSelect').value = settings.sport;
        document.getElementById('raceTime').value = settings.raceDuration;
        document.getElementById('numberOfPlayers').value = settings.numberOfPlayers;
        changeBackground();
        loadPlayerList(settings.players);

        if (settings.musicFile) {
            audio.src = settings.musicFile;
            isSongSelected = true;
        }
    } catch (error) {
        console.error("Error loading settings:", error);
        showError("Failed to load settings.");
    }
}
