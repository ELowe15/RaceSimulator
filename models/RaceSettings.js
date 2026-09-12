class RaceSettings {
  constructor({
    raceType = 'Balanced',
    battleMode = false,
    sport = 'Basketball',
    sportIndex = 0,
    raceDuration = 15,
    playerCount = 12,
    musicFile = null
  } = {}) {
    this.raceType = raceType;
    this.battleMode = battleMode;
    this.sport = sport;
    this.sportIndex = sportIndex;
    this.raceDuration = raceDuration;
    this.playerCount = playerCount;
    this.musicFile = musicFile;
  }

  static fromForm(formValues = {}) {
    return new RaceSettings({
      raceType: formValues.raceType || 'Balanced',
      battleMode: Boolean(formValues.battleMode),
      sport: formValues.sport || 'Basketball',
      sportIndex: Number(formValues.sportIndex) || 0,
      raceDuration: Number(formValues.raceDuration) || 15,
      playerCount: Number(formValues.playerCount) || 12,
      musicFile: formValues.musicFile || null
    });
  }

  toJSON() {
    return {
      raceType: this.raceType,
      battleMode: this.battleMode,
      sport: this.sport,
      sportIndex: this.sportIndex,
      raceDuration: this.raceDuration,
      playerCount: this.playerCount,
      musicFile: this.musicFile
    };
  }
}

if (typeof window !== 'undefined') {
  window.RaceSettings = RaceSettings;
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = RaceSettings;
}
