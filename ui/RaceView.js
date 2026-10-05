class PlayerRaceView {
    constructor(player, index, playerCount) {
        this.player = player;
        this.index = index;
        this.playerDiv = document.createElement('div');
        this.playerDiv.classList.add('player-container');
        this.playerDiv.style.position = 'absolute';
        this.playerDiv.dataset.playerId = player.id;

        this.iconDiv = document.createElement('div');
        this.iconDiv.classList.add('icon-container');

        this.positionLabel = document.createElement('div');
        this.positionLabel.classList.add('player-position-label');

        this.nameLabel = document.createElement('div');
        this.nameLabel.classList.add('player-name-label');

        this.playerImageDiv = document.createElement('div');
        this.playerImageDiv.classList.add('player');

        this.iconDiv.appendChild(this.nameLabel);
        this.iconDiv.appendChild(this.playerImageDiv);
        this.playerDiv.appendChild(this.positionLabel);
        this.playerDiv.appendChild(this.iconDiv);

        this.unsubscribe = player.subscribe((model, changes) => this.render(model, changes));
        this.setLane(index, playerCount);
        this.render(player, {
            name: true,
            image: true,
            backgroundColor: true,
            position: true,
            placement: true
        });
        document.body.appendChild(this.playerDiv);
    }

    setLane(index, playerCount) {
        this.index = index;
        const playerSize = Math.floor(window.innerHeight * 12 / 100);
        const spacing = (window.innerHeight - Math.ceil(playerSize)) / (playerCount + 1);

        this.playerDiv.setAttribute('data-player-size', playerSize);
        this.playerImageDiv.style.width = `${playerSize}px`;
        this.playerImageDiv.style.height = `${playerSize}px`;
        this.playerDiv.style.top = `${(index + 1) * spacing}px`;
        this.adjustNameLabel();
    }

    adjustNameLabel() {
        if (this.nameLabel.offsetWidth >= this.playerImageDiv.offsetWidth) {
            this.iconDiv.style.alignItems = 'flex-start';
        } else {
            this.iconDiv.style.alignItems = 'center';
        }
    }

    render(player, changes) {
        if (changes.name) {
            this.nameLabel.innerText = player.name;
            this.adjustNameLabel();
        }
        if (changes.image) {
            this.playerImageDiv.style.backgroundImage = `url('${player.image}')`;
        }
        if (changes.backgroundColor) {
            this.playerImageDiv.style.backgroundColor = player.backgroundColor;
        }
        if (changes.position) {
            this.playerDiv.style.left = `${player.position}px`;
        }
        if (changes.placement || changes.finished) {
            this.positionLabel.innerText = player.placement
                ? formatPlacement(player.placement)
                : `${this.index + 1}`;
        }
    }

    dispose() {
        this.unsubscribe();
        this.playerDiv.remove();
    }
}

const RaceView = (() => {
    const playerViews = new Map();

    function changeBackground() {
        const sportSelect = document.getElementById('sportSelect');
        const background = imageRoot + backgroundImage[sportSelect.selectedIndex];
        document.body.style.backgroundImage = `url('${background}')`;
    }

    function createPlayerElement(player, index, playerCollection) {
        const view = new PlayerRaceView(player, index, playerCollection.length);
        playerViews.set(player.id, view);
        view.positionLabel.innerText = `${index + 1}`;
        return view.playerDiv;
    }

    function refreshPlayerElements(create) {
        if (!create) {
            playerViews.forEach((view) => view.dispose());
            playerViews.clear();
            return;
        }

        const activeIds = new Set(players.map((player) => player.id));
        playerViews.forEach((view, playerId) => {
            if (!activeIds.has(playerId)) {
                view.dispose();
                playerViews.delete(playerId);
            }
        });

        players.forEach((player, index) => {
            let view = playerViews.get(player.id);
            if (!view) {
                createPlayerElement(player, index, players);
                view = playerViews.get(player.id);
            } else {
                view.setLane(index, players.length);
            }

            if (!player.placement) {
                view.positionLabel.innerText = `${index + 1}`;
            }
        });
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
    window.PlayerRaceView = PlayerRaceView;
    window.RaceView = RaceView;
    window.changeBackground = changeBackground;
    window.createPlayerElement = createPlayerElement;
    window.refreshPlayerElements = refreshPlayerElements;
    window.setFinishLinePosition = setFinishLinePosition;
    window.hideFinish = hideFinish;
}