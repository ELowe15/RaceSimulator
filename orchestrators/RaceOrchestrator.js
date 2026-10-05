const RaceTypeIndex = Object.freeze({ BALANCED: 0, HECTIC: 1, CLOSE: 2 });
const PlayerModel = typeof module !== 'undefined' && module.exports
  ? require('../models/Player')
  : Player;

class RaceOrchestrator {
    async handleStartRaceWithRecording() {
        if (document.getElementById("recordToggle").checked) {
            await startRecording();
            // Add delay to let the recording buffer initialize.
            await new Promise(resolve => setTimeout(resolve, 500));
        }

        if (audio.src) {
            audio.load();
            audio.play().catch(error => {
                showError("An error occurred while trying to play the audio. Please try another file.");
                console.error("Error during audio playback:", error);
            });
        }

        updatePlayerList();
        buildPlayerElements();
        this.startRace();
    }

    startRace() {
        refreshPlayerElements(true);
        toggleControls(false);
        togglePlayerList(true);
        showStandings(false);
        setFinishLinePosition();
        raceTime = parseInt(document.getElementById('raceTime').value, 10);
        finishedCount = 0;
        tempPlacements.length = 0;
        speeds = [];
        finished = [];

        const maxSpeed = 5 * 10 / raceTime;
        const trackLength = parseInt(document.querySelector('.finish-line1').style.left, 10);

        players.forEach((player) => {
            player.resetForRace();
            const baseSpeed = trackLength / (60 * raceTime);
            const speed = Math.min(baseSpeed * (Math.random() * 0.4 + 0.8), maxSpeed);
            player.speed = speed;
            speeds.push(speed);
            finished.push(false);
        });

        this.movePlayers();
    }

    movePlayers() {
        const relativeFinish = parseInt(document.querySelector('.finish-line1').style.left, 10);
        const playerDiv = document.getElementsByClassName('player-container')[0];
        const playerSize = parseFloat(playerDiv.getAttribute('data-player-size'));
        const labelSize = parseFloat(window.getComputedStyle(document.querySelector('.player-position-label')).width);
        const finishLine = relativeFinish - (playerSize + labelSize);

        let multiplier = 10 * window.innerWidth / 1917;
        let tempMaxSpeed = 5 * multiplier / raceTime;
        let tempMinSpeed = 1 * multiplier / raceTime;

        const raceType = document.getElementById('raceTypeSelect').selectedIndex;
        if (raceType === RaceTypeIndex.HECTIC) {
            tempMaxSpeed = tempMaxSpeed * 2 / 1.5;
            tempMinSpeed = tempMinSpeed / 1.5;
        } else if (raceType === RaceTypeIndex.CLOSE) {
            tempMaxSpeed = tempMaxSpeed / 1.2;
            tempMinSpeed = tempMinSpeed / 1.2;
        }

        const maxSpeed = tempMaxSpeed;
        const minSpeed = tempMinSpeed;
        const currentPositions = players.map((player, index) => ({
            index,
            position: player.position
        }));

        players.forEach((player, index) => {
            if (!player.finished) {
                const playerContainer = document.getElementsByClassName('player-container')[index];
                let position = currentPositions[index].position;
                const remainingPlayers = currentPositions.filter((_, playerIndex) => !players[playerIndex].finished);
                const totalPlayers = remainingPlayers.length;
                const sortedPositions = remainingPlayers.sort((a, b) => b.position - a.position);
                const rank = sortedPositions.findIndex(playerPosition => playerPosition.index === index);
                let speedChange;

                switch (raceType) {
                    case RaceTypeIndex.CLOSE:
                        if (Math.random() < 0.04 && totalPlayers !== 1) {
                            const scaleFactor = (rank - (totalPlayers - 1) / 2) / ((totalPlayers - 1) / 2);
                            speedChange = (Math.random() + scaleFactor) * 0.5;
                        } else {
                            speedChange = (Math.random() - 0.5) * 0.5;
                        }
                        break;
                    case RaceTypeIndex.HECTIC:
                        if (Math.random() < 0.02) {
                            speedChange = -maxSpeed / 2;
                        } else if (Math.random() > 0.98) {
                            speedChange = maxSpeed / 2;
                        } else {
                            speedChange = (Math.random() - 0.5) * 1;
                        }
                        break;
                    default:
                        {
                            const oddsMult = 6;
                            const rankFactor = Math.trunc(Math.abs((rank - (totalPlayers - 1) / 2) / ((totalPlayers - 1) / 2)) * oddsMult);
                            const lucky1 = Math.floor(Math.random() * rankFactor) % oddsMult;
                            const lucky2 = Math.floor(Math.random() * rankFactor) % oddsMult;
                            const lucky3 = Math.random() < 0.15;
                            const isLucky = lucky1 && lucky2 && lucky3;

                            if (rank >= 2 * totalPlayers / 3 && isLucky) {
                                speedChange = Math.random() * 0.5;
                            } else if (rank <= totalPlayers / 3 && isLucky) {
                                speedChange = (Math.random() - 1) * 0.5;
                            } else {
                                speedChange = (Math.random() - 0.5) * 0.5;
                            }
                        }
                        break;
                }

                speeds[index] = Math.max(minSpeed, Math.min(speeds[index] + speedChange, maxSpeed));
                position += speeds[index];

                if (position >= finishLine) {
                    position = finishLine;
                    finished[index] = true;
                    player.finish(finishedCount + 1);
                    finishedCount++;
                    tempPlacements.push(player.name);

                    if (tempPlacements.length === players.length) {
                        this.endRace();
                    }
                }

                player.position = position;
            }
        });

        const remainingPlayers = currentPositions.filter((_, playerIndex) => !players[playerIndex].finished);
        const sortedPositions = remainingPlayers.sort((a, b) => b.position - a.position);
        sortedPositions.forEach((playerPosition, rank) => {
            const placement = rank + 1 + finishedCount;
            players[playerPosition.index].placement = placement;
        });

        if (finished.includes(false)) {
            requestAnimationFrame(() => this.movePlayers());
        }
    }

    async endRace() {
        toggleControls(true);
        if (!document.getElementById('battleRoyaleToggle').checked) {
            placements = tempPlacements.slice();
            showStandings();
            await stopRecording();
            return;
        }

        const loser = tempPlacements[tempPlacements.length - 1];
        const loserPlayer = players.find(player => player.name === loser && player.placement === players.length);
        const playerIndex = loserPlayer ? players.findIndex(player => player.id === loserPlayer.id) : -1;
        placements.unshift(loser);

        if (playerIndex !== -1) {
            players.splice(playerIndex, 1);
            console.log(`Player ${loser} has been removed`);
        } else {
            console.log(`Player ${loser} not found`);
        }

        if (players.length === 1) {
            showBattleControls(false);
            placements.unshift(tempPlacements[0]);
            showStandings();
            await stopRecording();
            return;
        }

        showStandings();
    }
  }

if (typeof window !== 'undefined') {
    window.RaceOrchestrator = RaceOrchestrator;
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = RaceOrchestrator;
}
