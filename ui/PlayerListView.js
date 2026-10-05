const PlayerListView = (() => {
    let playerListContainer;
    let listVisible = false;
    const playerRows = new Map();

    function createPlayerListContainer() {
        if (playerListContainer) {
            return;
        }

        playerListContainer = document.createElement('div');
        playerListContainer.classList.add('player-list');

        const title = document.createElement('h2');
        title.textContent = 'Player List';
        title.classList.add('player-list-title');

        const playerListContent = document.getElementById('playerListContent');
        const closePlayer = document.createElement('button');
        closePlayer.textContent = 'Close';
        closePlayer.className = 'close-button';
        closePlayer.addEventListener('click', togglePlayerList);

        playerListContainer.appendChild(title);
        playerListContainer.appendChild(playerListContent);
        playerListContainer.appendChild(closePlayer);
        document.body.appendChild(playerListContainer);
    }

    function togglePlayerList(invisible) {
        if (!playerListContainer) {
            return;
        }

        if (invisible) {
            listVisible = false;
            playerListContainer.style.display = 'none';
            return;
        }

        playerListContainer.style.display = listVisible ? 'none' : 'flex';
        listVisible = !listVisible;
    }

    function createPlayerInput(player, index) {
        const playerDiv = document.createElement('div');
        playerDiv.classList.add('player-input');
        playerDiv.dataset.playerId = player.id;

        const nameInput = document.createElement('input');
        nameInput.placeholder = `Player ${index + 1} Name`;
        nameInput.classList.add('player-name');
        nameInput.value = player.name;

        const randomPlaceHolder = document.createElement('label');
        randomPlaceHolder.textContent = player.name;
        randomPlaceHolder.classList.add('place-holder');

        const imageInput = document.createElement('input');
        imageInput.type = 'file';
        imageInput.accept = 'image/*';
        imageInput.classList.add('player-image');
        imageInput.style.display = 'none';

        const customButton = document.createElement('button');
        customButton.textContent = 'Choose Image';
        customButton.style.color = 'white';
        customButton.classList.add('custom-file-button');

        const fileNameDisplay = document.createElement('span');
        fileNameDisplay.textContent = player.imageName || 'No file chosen';
        fileNameDisplay.classList.add('file-name-display');

        const colorInput = document.createElement('input');
        colorInput.type = 'color';
        colorInput.value = player.backgroundColor;
        colorInput.classList.add('player-color');

        playerDiv.appendChild(nameInput);
        playerDiv.appendChild(randomPlaceHolder);
        playerDiv.appendChild(customButton);
        playerDiv.appendChild(fileNameDisplay);
        playerDiv.appendChild(imageInput);
        playerDiv.appendChild(colorInput);

        nameInput.addEventListener('input', () => {
            player.name = nameInput.value || randomPlaceHolder.textContent;
        });

        colorInput.addEventListener('input', () => {
            player.backgroundColor = colorInput.value;
        });

        customButton.addEventListener('click', () => imageInput.click());
        imageInput.addEventListener('change', (event) => {
            const file = event.target.files[0];
            if (!file) {
                return;
            }

            player.imageName = file.name;
            player.image = URL.createObjectURL(file);
            fileNameDisplay.textContent = file.name;
        });

        playerRows.set(player.id, { element: playerDiv, player });
        return playerDiv;
    }

    function renderPlayerInputs() {
        const playerListContent = document.getElementById('playerListContent');
        const activeIds = new Set(players.map((player) => player.id));

        playerRows.forEach((row, playerId) => {
            if (!activeIds.has(playerId)) {
                row.element.remove();
                playerRows.delete(playerId);
            }
        });

        players.forEach((player, index) => {
            let row = playerRows.get(player.id);
            if (!row) {
                row = { element: createPlayerInput(player, index), player };
            }

            row.element.querySelector('.player-name').placeholder = `Player ${index + 1} Name`;
            playerListContent.appendChild(row.element);
        });
    }

    function updatePlayerList(playerData) {
        const numberInput = document.getElementById('numberOfPlayers');
        if (!numberInput) {
            return;
        }

        const numPlayers = Math.max(0, Number.parseInt(numberInput.value, 10) || 0);
        const existingPlayers = playerData || players;
        players = PlayerFactory.createBulk(
            numPlayers,
            document.getElementById('sportSelect').selectedIndex,
            existingPlayers
        );
        prevPlayerCount = numPlayers;
        renderPlayerInputs();
    }

    function buildPlayerElements() {
        renderPlayerInputs();
        refreshPlayerElements(true);
    }

    function loadPlayerList(savedPlayers) {
        document.getElementById('playerListContent').innerHTML = '';
        playerRows.clear();
        players = PlayerFactory.createBulk(
            savedPlayers ? savedPlayers.length : 0,
            document.getElementById('sportSelect').selectedIndex,
            savedPlayers || []
        );
        document.getElementById('numberOfPlayers').value = players.length;
        prevPlayerCount = players.length;
        renderPlayerInputs();
        buildPlayerElements();
    }

    return {
        createPlayerListContainer,
        togglePlayerList,
        updatePlayerList,
        buildPlayerElements,
        loadPlayerList
    };
})();

const createPlayerListContainer = PlayerListView.createPlayerListContainer;
const togglePlayerList = PlayerListView.togglePlayerList;
const updatePlayerList = PlayerListView.updatePlayerList;
const buildPlayerElements = PlayerListView.buildPlayerElements;
const loadPlayerList = PlayerListView.loadPlayerList;

if (typeof window !== 'undefined') {
    window.PlayerListView = PlayerListView;
    window.createPlayerListContainer = createPlayerListContainer;
    window.togglePlayerList = togglePlayerList;
    window.updatePlayerList = updatePlayerList;
    window.buildPlayerElements = buildPlayerElements;
    window.loadPlayerList = loadPlayerList;
}