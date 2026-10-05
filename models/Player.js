class Player {
  constructor({
    name = 'Player',
    image = '',
    imageName = 'No file chosen',
    backgroundColor = '#ffffff',
    sportIndex = 0,
    position = 0,
    speed = 0,
    finished = false,
    placement = null,
    id = null,
    isEliminated = false
  } = {}) {
    this.listeners = new Set();
    this.id = id ?? `${Date.now()}-${Math.random().toString(16).slice(2, 8)}`;
    this._state = {
      name,
      image,
      imageName,
      backgroundColor,
      sportIndex,
      position,
      speed,
      finished,
      placement,
      isEliminated
    };
  }

  get name() {
    return this._state.name;
  }

  set name(value) {
    this.update({ name: value });
  }

  get image() {
    return this._state.image;
  }

  set image(value) {
    this.update({ image: value });
  }

  get imageName() {
    return this._state.imageName;
  }

  set imageName(value) {
    this.update({ imageName: value });
  }

  get backgroundColor() {
    return this._state.backgroundColor;
  }

  set backgroundColor(value) {
    this.update({ backgroundColor: value });
  }

  get sportIndex() {
    return this._state.sportIndex;
  }

  set sportIndex(value) {
    this.update({ sportIndex: value });
  }

  get position() {
    return this._state.position;
  }

  set position(value) {
    this.update({ position: value });
  }

  get speed() {
    return this._state.speed;
  }

  set speed(value) {
    this.update({ speed: value });
  }

  get finished() {
    return this._state.finished;
  }

  set finished(value) {
    this.update({ finished: value });
  }

  get placement() {
    return this._state.placement;
  }

  set placement(value) {
    this.update({ placement: value });
  }

  get isEliminated() {
    return this._state.isEliminated;
  }

  set isEliminated(value) {
    this.update({ isEliminated: value });
  }

  subscribe(listener) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  update(changes = {}) {
    const changedFields = {};

    Object.entries(changes).forEach(([field, value]) => {
      if (this._state[field] !== value) {
        this._state[field] = value;
        changedFields[field] = value;
      }
    });

    if (Object.keys(changedFields).length) {
      this.listeners.forEach((listener) => listener(this, changedFields));
    }

    return this;
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
      id: this.id,
      name: this.name,
      image: this.image,
      imageName: this.imageName,
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
