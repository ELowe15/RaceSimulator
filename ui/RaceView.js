const RaceView = (() => {
    function changeBackground() {
        const sportSelect = document.getElementById('sportSelect');
        const background = imageRoot + backgroundImage[sportSelect.selectedIndex];
        document.body.style.backgroundImage = `url('${background}')`;
    }

    function adjustNameLabel(playerDiv) {
        const nameLabel = playerDiv.querySelector('.player-name-label');
        const playerImageDiv = playerDiv.querySelector('.player');
        const iconDiv = playerDiv.querySelector('.icon-container');

        if (nameLabel.offsetWidth >= playerImageDiv.offsetWidth) {
            iconDiv.style.alignItems = 'flex-start';
        }
    }

    function createPlayerElement(player, index, players) {
        const playerDiv = document.createElement('div');
        playerDiv.classList.add('player-container');
        playerDiv.style.position = 'absolute';

        const iconDiv = document.createElement('div');
        iconDiv.classList.add('icon-container');

        const positionLabel = document.createElement('div');
        positionLabel.classList.add('player-position-label');
        positionLabel.innerText = `${index + 1}`;

        const nameLabel = document.createElement('div');
        nameLabel.classList.add('player-name-label');
        nameLabel.innerText = player.name;

        const playerImageDiv = document.createElement('div');
        playerImageDiv.classList.add('player');
        playerImageDiv.style.backgroundImage = `url('${player.image}')`;
        playerImageDiv.style.backgroundColor = player.backgroundColor;

        const playerSize = Math.floor(window.innerHeight * 15 / 100);
        playerDiv.setAttribute('data-player-size', playerSize);
        playerImageDiv.style.width = `${playerSize}px`;
        playerImageDiv.style.height = playerImageDiv.style.width;

        playerDiv.appendChild(positionLabel);
        iconDiv.appendChild(nameLabel);
        iconDiv.appendChild(playerImageDiv);
        playerDiv.appendChild(iconDiv);

        const spacing = (window.innerHeight - Math.ceil(playerSize)) / (players.length + 1);
        playerDiv.style.top = `${(index + 1) * spacing}px`;

        document.body.appendChild(playerDiv);
        adjustNameLabel(playerDiv);

        return playerDiv;
    }

    function refreshPlayerElements(create) {
        document.querySelectorAll('.player-container').forEach((playerContainer) => playerContainer.remove());
        if (create) {
            players.forEach((player, index) => createPlayerElement(player, index, players));
        }
    }

    function setFinishLinePosition() {
        const finishLine1 = document.querySelector('.finish-line1');
        const finishLine2 = document.querySelector('.finish-line2');
        const sportPositions = [1822, 1697, 1822, 1462];
        const position = window.innerWidth * sportPositions[document.getElementById('sportSelect').selectedIndex] / 1912;

        finishLine1.style.left = `${position}px`;
        finishLine1.style.right = '';
        finishLine1.style.visibility = 'visible';

        const finishLineWidth = parseFloat(window.getComputedStyle(finishLine2).width);
        finishLine2.style.left = `${position + finishLineWidth}px`;
        finishLine2.style.right = '';
        finishLine2.style.visibility = 'visible';
    }

    function hideFinish() {
        document.querySelector('.finish-line1').style.visibility = 'hidden';
        document.querySelector('.finish-line2').style.visibility = 'hidden';
    }

    return {
        changeBackground,
        createPlayerElement,
        refreshPlayerElements,
        setFinishLinePosition,
        hideFinish
    };
})();

const changeBackground = RaceView.changeBackground;
const createPlayerElement = RaceView.createPlayerElement;
const refreshPlayerElements = RaceView.refreshPlayerElements;
const setFinishLinePosition = RaceView.setFinishLinePosition;
const hideFinish = RaceView.hideFinish;

if (typeof window !== 'undefined') {
    window.RaceView = RaceView;
    window.changeBackground = changeBackground;
    window.createPlayerElement = createPlayerElement;
    window.refreshPlayerElements = refreshPlayerElements;
    window.setFinishLinePosition = setFinishLinePosition;
    window.hideFinish = hideFinish;
}
