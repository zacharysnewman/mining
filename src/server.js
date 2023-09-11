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

  // Function to simulate mining with a delay
  function mineWithDelay(times, callback) {
    let minedRock = 0;
    let minedOre = 0;
    let minedTreasure = 0;
    let completedMines = 0;

    function mineIteration(index) {
      if (index === times) {
        completedMines++;

        if (completedMines === times) {
          // When all mining iterations are complete, send the response
          callback(minedRock, minedOre, minedTreasure);
        }
        return;
      }

      setTimeout(() => {
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

        mineIteration(index + 1);
      }, 1000); // Simulate 1 second delay for each mine
    }

    mineIteration(0);
  }

  let response = "";

  if (pathname === "/status") {
    // Handle /status command
    response = `Current Status: Rock: ${rockCount}, Ore: ${oreCount}, Treasure: ${treasureCount}`;
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end(response);
  } else if (pathname === "/mine") {
    // Handle /mine command with query parameter "times"
    const times = parseInt(query.times) || 1;

    mineWithDelay(times, (minedRock, minedOre, minedTreasure) => {
      response = `Mined ${times} times. Found: Rock: ${minedRock}, Ore: ${minedOre}, Treasure: ${minedTreasure}. Updated totals: Rock: ${rockCount}, Ore: ${oreCount}, Treasure: ${treasureCount}`;
      res.writeHead(200, { "Content-Type": "text/plain" });
      res.end(response);
    });
  } else {
    response = "Invalid command";
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end(response);
  }
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
