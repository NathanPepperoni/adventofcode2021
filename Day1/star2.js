import fs from "fs";

function star2() {
  const fileString = fs.readFileSync('./Day1/puzzle_input.txt', {encoding:'utf8', flag:'r'});
  const sonarPings = fileString.split("\n").map((elem) => Number.parseInt(elem));

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