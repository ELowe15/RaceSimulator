const RaceTypeIndex = Object.freeze({
  BALANCED: 0,
  HECTIC: 1,
  CLOSE: 2,
});

class RaceOrchestrator {
  constructor({
    players = [],
    raceType = 'Balanced',
    raceDuration = 15,
    finishLine = 800,
    onFrame = null,
    onFinish = null
  } = {}) {
    this.players = players.map((player) => player instanceof Player ? player : new Player(player));
    this.raceType = raceType;
    this.raceDuration = raceDuration;
    this.finishLine = finishLine;
    this.speeds = [];
    this.finished = [];
    this.placements = [];
    this.tempPlacements = [];
    this.finishedCount = 0;
    this.onFrame = onFrame || (() => {});
    this.onFinish = onFinish || (() => {});
    this.animationFrameId = null;
  }

  getRaceTypeIndex() {
    if (this.raceType === 'Hectic') return RaceTypeIndex.HECTIC;
    if (this.raceType === 'Close') return RaceTypeIndex.CLOSE;
    return RaceTypeIndex.BALANCED;
  }

  initializeRace() {
    this.finishedCount = 0;
    this.tempPlacements = [];
    this.placements = [];
    this.speeds = [];
    this.finished = [];

    this.players.forEach((player) => player.resetForRace());

    const maxSpeed = 5 * 10 / this.raceDuration;
    const trackLength = this.finishLine;

    this.players.forEach(() => {
      const baseSpeed = trackLength / (60 * this.raceDuration);
      const speed = Math.min(baseSpeed * (Math.random() * 0.4 + 0.8), maxSpeed);
      this.speeds.push(speed);
      this.finished.push(false);
    });

    return this;
  }

  applySpeedChange(index, rank, totalPlayers, maxSpeed, minSpeed) {
    const raceTypeIndex = this.getRaceTypeIndex();
    const currentSpeed = this.speeds[index];
    const rankSpread = totalPlayers > 1
      ? (rank - (totalPlayers - 1) / 2) / ((totalPlayers - 1) / 2)
      : 0;
    const midPackPressure = Math.max(0, 1 - Math.abs(rankSpread));
    let speedChange = 0;

    switch (raceTypeIndex) {
      case RaceTypeIndex.CLOSE: {
        const baseDrift = (Math.random() - 0.5) * 0.52 * maxSpeed;
        const pulseChance = 0.2 + (1 - Math.min(rank / Math.max(totalPlayers - 1, 1), 1)) * 0.1;
        const pulse = Math.random() < pulseChance
          ? (Math.random() - 0.5) * 0.9 * maxSpeed
          : 0;
        const gapBias = rank === 0 ? -0.18 * maxSpeed : rank >= totalPlayers - 1 ? 0.22 * maxSpeed : 0;

        speedChange = baseDrift + pulse + gapBias;

        if (rank === 0) speedChange -= 0.18 * maxSpeed;
        if (rank >= totalPlayers - 1) speedChange += 0.16 * maxSpeed;
        break;
      }
      case RaceTypeIndex.HECTIC: {
        const baseDrift = (Math.random() - 0.5) * 1.2 * maxSpeed;
        const burst = Math.random() < 0.24
          ? (Math.random() < 0.5 ? -1 : 1) * (0.7 + Math.random() * 1.1) * maxSpeed
          : 0;
        const pressure = Math.random() < 0.2
          ? (Math.random() - 0.5) * 0.8 * maxSpeed * (1 + Math.abs(rankSpread))
          : 0;
        const gapBoost = rank >= totalPlayers - 1 ? 0.18 * maxSpeed : rank === 0 ? -0.12 * maxSpeed : 0;

        speedChange = baseDrift + burst + pressure + gapBoost;
        if (rank === 0) speedChange *= 0.75;
        break;
      }
      case RaceTypeIndex.BALANCED:
      default: {
        const isTrail = rank >= totalPlayers - 1;
        const isBackHalf = rank >= totalPlayers * 0.65;
        const baseDrift = (Math.random() - 0.5) * 0.18 * maxSpeed;
        let surge = 0;

        if (isTrail && Math.random() < 0.2) {
          surge = (0.35 + Math.random() * 0.7) * maxSpeed;
        } else if (isBackHalf && Math.random() < 0.12) {
          surge = (Math.random() * 0.3) * maxSpeed;
        } else if (Math.random() < 0.06) {
          surge = (Math.random() - 0.5) * 0.34 * maxSpeed;
        }

        const drag = Math.random() < 0.05 ? -Math.random() * 0.18 * maxSpeed : 0;
        const gapPull = isTrail ? 0.06 * maxSpeed : 0;
        speedChange = baseDrift + surge + drag + gapPull;

        if (Math.abs(rankSpread) < 0.4 && Math.random() < 0.08) {
          speedChange += (Math.random() - 0.5) * 0.18 * maxSpeed * (0.5 + midPackPressure);
        }
        break;
      }
    }

    const smoothedChange = speedChange * 0.55;
    this.speeds[index] = Math.max(minSpeed, Math.min(currentSpeed + smoothedChange, maxSpeed));
    return this.speeds[index];
  }

  tick() {
    const activePlayers = this.players
      .map((player, index) => ({ player, index, position: player.position }))
      .filter(({ index }) => !this.finished[index]);

    if (!activePlayers.length) {
      return this;
    }

    activePlayers.forEach(({ player, index }) => {
      const remainingPlayers = this.players
        .map((candidate, candidateIndex) => ({ candidate, candidateIndex, position: candidate.position }))
        .filter((entry) => !this.finished[entry.candidateIndex]);

      const sortedPositions = remainingPlayers.sort((a, b) => b.position - a.position);
      const rank = sortedPositions.findIndex((entry) => entry.candidateIndex === index);
      const multiplier = 10 * window.innerWidth / 1917;
      const maxSpeed = 5 * multiplier / this.raceDuration;
      const minSpeed = 1 * multiplier / this.raceDuration;

      this.applySpeedChange(index, rank, remainingPlayers.length, maxSpeed, minSpeed);
      const nextPosition = player.position + this.speeds[index];

      if (nextPosition >= this.finishLine) {
        player.setPosition(this.finishLine);
        player.finish(this.finishedCount + 1);
        this.finished[index] = true;
        this.finishedCount += 1;
        this.tempPlacements.push(player.name);
        this.onFrame?.({ index, player, placement: this.finishedCount });

        if (this.tempPlacements.length === this.players.length) {
          this.finishRace();
        }
      } else {
        player.setPosition(nextPosition);
      }
    });

    return this;
  }

  finishRace() {
    this.placements = this.tempPlacements.slice();
    this.onFinish?.({ placements: this.placements.slice() });
    return this.placements;
  }
}

if (typeof window !== 'undefined') {
  window.RaceOrchestrator = RaceOrchestrator;
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = RaceOrchestrator;
}
