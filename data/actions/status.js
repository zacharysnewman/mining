// Handle the "status" action
function handleStatus(playerData, query, callback) {
  const player = query.player;
  if (playerData.hasOwnProperty(player)) {
    const playerCount = playerData[player];
    const response = `Current Status for ${player}: Rock: ${playerCount.rockCount}, Ore: ${playerCount.oreCount}, Treasure: ${playerCount.treasureCount}, Common Fish: ${playerCount.commonFishCount}, Rare Fish: ${playerCount.rareFishCount}, Legendary Fish: ${playerCount.legendaryFishCount}`;
    callback(response);
  } else {
    callback("Player not found", 404);
  }
}

module.exports = { handleStatus };
