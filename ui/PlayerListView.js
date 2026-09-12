const PlayerListView = (() => {
    let playerListContainer;
    let listVisible = false;

    function createPlayerListContainer() {
        if (!playerListContainer) {
            playerListContainer = document.createElement('div');
            playerListContainer.classList.add('player-list');

            const title = document.createElement('h2');
            title.textContent = 'Player List';
            title.classList.add('player-list-title');

            const playerListContent = document.getElementById('playerListContent');
            playerListContent.addEventListener('change', buildPlayerElements);

            const closePlayer = document.createElement('button');
            closePlayer.textContent = 'Close';
            closePlayer.className = 'close-button';
            closePlayer.addEventListener('click', togglePlayerList);

            playerListContainer.appendChild(title);
            playerListContainer.appendChild(playerListContent);
            playerListContainer.appendChild(closePlayer);
            document.body.appendChild(playerListContainer);
        }
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

    function createPlayerInput(playerData, index) {
        const playerDiv = document.createElement('div');
        playerDiv.classList.add('player-input');

        const nameInput = document.createElement('input');
        nameInput.placeholder = `Player ${index + 1} Name`;
        nameInput.classList.add('player-name');

        const randomPlaceHolder = document.createElement('label');
        randomPlaceHolder.textContent = getRandomName(document.getElementById('sportSelect').selectedIndex);
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
        fileNameDisplay.textContent = playerData ? playerData.imageName : 'No file chosen';
        fileNameDisplay.classList.add('file-name-display');

        playerDiv.appendChild(nameInput);
        playerDiv.appendChild(randomPlaceHolder);
        playerDiv.appendChild(customButton);
        playerDiv.appendChild(fileNameDisplay);
        playerDiv.appendChild(imageInput);

        customButton.addEventListener('click', () => imageInput.click());
        imageInput.addEventListener('change', (event) => {
            const file = event.target.files[0];
            fileNameDisplay.textContent = file ? file.name : 'No file chosen';
            playerDiv.loadedImage = null;
        });

        playerDiv.loadedImage = null;

        const colorInput = document.createElement('input');
        colorInput.type = 'color';
        colorInput.value = playerData ? playerData.backgroundColor : getRandomColor();
        colorInput.classList.add('player-color');
        playerDiv.appendChild(colorInput);

        if (playerData) {
            nameInput.value = playerData.name;
            playerDiv.loadedImage = playerData.image;
        }

        return playerDiv;
    }

    function updatePlayerList(playerData) {
        const numberInput = document.getElementById('numberOfPlayers');
        if (!numberInput) {
            return;
        }

        const numPlayers = parseInt(numberInput.value, 10);
        const playerListContent = document.getElementById('playerListContent');

        if (numPlayers > prevPlayerCount) {
            for (let index = prevPlayerCount; index < numPlayers; index++) {
                playerListContent.appendChild(createPlayerInput(playerData ? playerData[index] : null, index));
            }
        } else if (numPlayers === 0) {
            return;
        } else if (numPlayers < prevPlayerCount) {
            for (let index = prevPlayerCount - 1; index >= numPlayers; index--) {
                playerListContent.removeChild(playerListContent.children[index]);
            }
        }

        if (numPlayers) {
            prevPlayerCount = numPlayers;
        }
    }

    function buildPlayerElements() {
        const playerDivs = document.querySelectorAll('.player-input');
        const sportSelect = document.getElementById('sportSelect');
        players = [];

        playerDivs.forEach((div) => {
            const nameInput = div.querySelector('.player-name');
            const randomPlaceHolder = div.querySelector('.place-holder');
            const imageInput = div.querySelector('.player-image');
            const colorInput = div.querySelector('.player-color');
            const imageFile = imageInput.files[0];
            const defaultImage = imageFile
                ? URL.createObjectURL(imageFile)
                : imageRoot + defaultPlayerImage[sportSelect.selectedIndex];

            players.push({
                name: nameInput.value.trim() || randomPlaceHolder.textContent,
                image: div.loadedImage ? div.loadedImage : defaultImage,
                backgroundColor: colorInput.value || getRandomColor()
            });
        });

        refreshPlayerElements(true);
    }

    function loadPlayerList(savedPlayers) {
        document.getElementById('playerListContent').innerHTML = '';
        prevPlayerCount = 0;
        updatePlayerList(savedPlayers);
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
