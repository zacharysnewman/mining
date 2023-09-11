const http = require("http");
const url = require("url");

// Define the initial resource counts
let rockCount = 10;
let oreCount = 5;
let treasureCount = 2;

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const pathname = parsedUrl.pathname;
  const query = parsedUrl.query;
  let response = "";

  if (pathname === "/status") {
    // Handle /status command
    response = `Current Status: Rock: ${rockCount}, Ore: ${oreCount}, Treasure: ${treasureCount}`;
  } else if (pathname === "/mine") {
    // Handle /mine command with query parameter "times"
    const times = parseInt(query.times) || 1;
    let minedRock = 0;
    let minedOre = 0;
    let minedTreasure = 0;

    for (let i = 0; i < times; i++) {
      // Simulate mining with a random chance
      const randomValue = Math.random();

      if (randomValue < 0.6) {
        rockCount++;
        minedRock++;
      } else if (randomValue < 0.9) {
        oreCount++;
        minedOre++;
      } else {
        treasureCount++;
        minedTreasure++;
      }
    }

    response = `Mined ${times} times. Found: Rock: ${minedRock}, Ore: ${minedOre}, Treasure: ${minedTreasure}. Updated totals: Rock: ${rockCount}, Ore: ${oreCount}, Treasure: ${treasureCount}`;
  } else {
    response = "Invalid command";
  }

  res.writeHead(200, { "Content-Type": "text/plain" });
  res.end(response);
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
