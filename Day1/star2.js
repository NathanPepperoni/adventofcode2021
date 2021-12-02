import loadPuzzleInput from "../utils/loadPuzzleInput.js";

function star2() {
  const sonarPings = loadPuzzleInput(1).map((elem) => Number.parseInt(elem));

  let prevSum = -1;
  let count = -1;
  let window = [];

  sonarPings.forEach((ping) => {
    window.push(ping);
    if (window.length === 4) {
      window = window.slice(1);
    }
    if (window.length === 3) {
      const sum = window.reduce((acc, a) => acc + a, 0);
      if (sum > prevSum) {
        count++;
      }
      prevSum = sum;
    }
  });

  return count;
}

export default star2;
