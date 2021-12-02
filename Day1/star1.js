import fs from "fs";

function star1() {
  const fileString = fs.readFileSync('./Day1/puzzle_input.txt', {encoding:'utf8', flag:'r'});
  const sonarPings = fileString.split("\n").map((elem) => Number.parseInt(elem));

  let prev = -1;
  let count = -1;

  sonarPings.forEach((ping) => {
    if (ping > prev) {
      count++
    }
    prev = ping;
  });

  return count;
}

export default star1;