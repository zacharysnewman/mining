const readline = require("readline");
const http = require("http");
const { SingleBar, Presets } = require("cli-progress");

// Define the server endpoint
const SERVER_ENDPOINT = "http://localhost:3000";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function mine(times) {
  const progressBar = new SingleBar({}, Presets.shades_classic);
  progressBar.start(times, 0);

  function mineIteration(index) {
    if (index === times) {
      progressBar.stop();
      displayPrompt();
      return;
    }

    // Simulate mining that takes 1 second
    setTimeout(() => {
      http.get(`${SERVER_ENDPOINT}/mine?times=1`, (res) => {
        res.on("data", (chunk) => {
          // Update the progress bar for each mine
          progressBar.update(index + 1);
        });

        res.on("end", () => {
          // Continue mining for the next iteration
          mineIteration(index + 1);
        });
      });
    }, 1000); // 1000 milliseconds = 1 second
  }

  mineIteration(0);
}

function displayPrompt() {
  rl.question(
    'Enter a command ("status" or "mine <times, default to 1>"): ',
    (input) => {
      const [command, arg] = input.split(" ");

      if (command === "status") {
        // Send a GET request to the server for /status
        http.get(`${SERVER_ENDPOINT}/status`, (res) => {
          let data = "";

          res.on("data", (chunk) => {
            data += chunk;
          });

          res.on("end", () => {
            console.log(data);
            displayPrompt();
          });
        });
      } else if (command === "mine") {
        const times = parseInt(arg) || 1;
        mine(times);
      } else {
        console.log('Invalid command. Use "status" or "mine <times>".');
        displayPrompt();
      }
    }
  );
}

// Start the command input loop
displayPrompt();
