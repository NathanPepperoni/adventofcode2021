import star1 from "./Day1/star1.js";
import star2 from "./Day1/star2.js";
import star3 from "./Day2/star3.js";
import star4 from "./Day2/star4.js";
import star5 from "./Day3/star5.js";
import star6 from "./Day3/star6.js";

const starray = [star1, star2, star3, star4, star5, star6];

const invalidArguments = () => {
  console.log("Invalid argument. Please read the README.")
}

const execute = () => {
  const args = process.argv;
  const cliArg = args[2].toLowerCase();
  const argNumber = Math.max(Number.parseInt(cliArg.replace("star", "").replace("day", "")), 1);
  if (Number.isNaN(argNumber)) {
    invalidArguments();
    return;
  }
  if (cliArg.startsWith("star")) {
    solveStar(argNumber);
  }
  else if (cliArg.startsWith("day")) {
    solveDay(argNumber);
  }
  else {
    invalidArguments();
    return;
  }
};

const solveStar = (starNumber) => {
  if (starNumber > starray.length) {
    console.log("requested star number not implemented yet.");
    return;
  }
  const result = starray[starNumber - 1]();

  console.log(`star ${starNumber} result: ${result}`);
};

const solveDay = (dayNumber) => {
  if (dayNumber > starray.length/2) {
    console.log("requested star number not implemented yet.");
    return;
  }
  const firstStarNumber = 1 + 2*(dayNumber-1);
  const secondStarNumber = 2 + 2*(dayNumber-1);
  const firstResult = starray[firstStarNumber - 1]();
  const secondResult = starray[secondStarNumber - 1]();

  console.log(`Day ${dayNumber} results...`);
  console.log(`first star: ${firstResult}`);
  console.log(`second star: ${secondResult}`);
};

execute();
