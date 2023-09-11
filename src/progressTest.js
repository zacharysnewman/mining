const { SingleBar, Presets, MultiBar } = require("cli-progress");

const max = 100;

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

async function main() {
  const multibar = new MultiBar(
    {
      clearOnComplete: false,
      hideCursor: false,
      format: " {id} {action} \t| {bar} | {value}/{total}",
    },
    Presets.shades_grey
  );
  const b1 = multibar.create(100, 0);
  const b2 = multibar.create(200, 0);

  for (let i = 0; i <= max; i++) {
    b1.update(i, { id: 1, action: "Mining" });
    for (let e = 0; e <= 200; e++) {
      b2.update(e, { id: 2, action: "Current" });
      await sleep(1);
    }
    await sleep(200);
  }

  multibar.stop();
}

main().then(() => {});

// const incrementProgress = (progressBar, currentProgress) => {
//   setTimeout(() => {
//     const newProgress = currentProgress + 1; // Increment by 1 or any other desired value
//     progressBar.update(newProgress); // Round to 2 decimal places

//     if (newProgress < progressBar.getTotal()) {
//       incrementProgress(progressBar, progressBar.getProgress());
//     } else {
//       progressBar.stop(); // Stop the progress bar when it's completed
//     }
//   }, 1000);
// };

// incrementProgress(progressBar, 0);
