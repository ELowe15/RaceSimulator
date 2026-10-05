class PlayerFactory {
  static createBulk(count, sportIndex = 0, existingPlayers = []) {
    const safeCount = Math.max(0, Number.parseInt(count, 10) || 0);
    const nextPlayers = existingPlayers.map((player, index) => {
      if (player instanceof Player) {
        return player;
      }

      return Player.fromDefinition({
        ...player,
        image: player.image || `${window.imageRoot || 'Images/'}${window.defaultPlayerImage ? window.defaultPlayerImage[sportIndex] : 'bballHollow.png'}`,
        sportIndex: player.sportIndex ?? sportIndex,
        id: player.id ?? `${Date.now()}-${index}`
      });
    });

    for (let index = nextPlayers.length; index < safeCount; index += 1) {
      nextPlayers.push(new Player({
        name: getRandomName(sportIndex),
        image: `${window.imageRoot || 'Images/'}${window.defaultPlayerImage ? window.defaultPlayerImage[sportIndex] : 'bballHollow.png'}`,
        backgroundColor: getRandomColor(),
        sportIndex,
        id: `${Date.now()}-${index}`
      }));
    }

    return nextPlayers.slice(0, safeCount);
  }
}

if (typeof window !== 'undefined') {
  window.PlayerFactory = PlayerFactory;
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = PlayerFactory;
}
