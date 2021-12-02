import loadPuzzleInput from "../utils/loadPuzzleInput.js";

function star1() {
  const sonarPings = loadPuzzleInput(1).map((elem) => Number.parseInt(elem));

  let prev = -1;
  let count = -1;

  sonarPings.forEach((ping) => {
    if (ping > prev) {
      count++;
    }
    prev = ping;
  });

  return count;
}

export default star1;
