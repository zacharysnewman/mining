const readline = require("readline");
const http = require("http");

// Define the server endpoint
const SERVER_ENDPOINT = "http://localhost:3000";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

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
        // Send a GET request to the server for /mine with query parameter
        http.get(`${SERVER_ENDPOINT}/mine?times=${times}`, (res) => {
          let data = "";

          res.on("data", (chunk) => {
            data += chunk;
          });

          res.on("end", () => {
            console.log(data);
            displayPrompt();
          });
        });
      } else {
        console.log('Invalid command. Use "status" or "mine <times>".');
        displayPrompt();
      }
    }
  );
}

// Start the command input loop
displayPrompt();
