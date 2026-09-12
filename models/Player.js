class Player {
  constructor({
    name = 'Player',
    image = '',
    backgroundColor = '#ffffff',
    sportIndex = 0,
    position = 0,
    speed = 0,
    finished = false,
    placement = null,
    id = null,
    isEliminated = false
  } = {}) {
    this.id = id ?? `${Date.now()}-${Math.random().toString(16).slice(2, 8)}`;
    this.name = name;
    this.image = image;
    this.backgroundColor = backgroundColor;
    this.sportIndex = sportIndex;
    this.position = position;
    this.speed = speed;
    this.finished = finished;
    this.placement = placement;
    this.isEliminated = isEliminated;
  }

  resetForRace() {
    this.position = 0;
    this.speed = 0;
    this.finished = false;
    this.placement = null;
    this.isEliminated = false;
    return this;
  }

  setPosition(value) {
    this.position = Number(value) || 0;
    return this;
  }

  finish(placement) {
    this.finished = true;
    this.placement = placement;
    return this;
  }

  toJSON() {
    return {
      name: this.name,
      image: this.image,
      backgroundColor: this.backgroundColor,
      sportIndex: this.sportIndex,
      position: this.position,
      speed: this.speed,
      finished: this.finished,
      placement: this.placement,
      isEliminated: this.isEliminated
    };
  }

  static fromDefinition(definition = {}) {
    return new Player(definition);
  }
}

if (typeof window !== 'undefined') {
  window.Player = Player;
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = Player;
}
