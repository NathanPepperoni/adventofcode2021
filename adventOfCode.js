import star1 from "./Day1/star1.js";
import star2 from "./Day1/star2.js";
import star19 from "./Day10/star19.js";
import star20 from "./Day10/star20.js";
import star21 from "./Day11/star21.js";
import star22 from "./Day11/star22.js";
import star23 from "./Day12/star23.js";
import star24 from "./Day12/star24.js";
import star3 from "./Day2/star3.js";
import star4 from "./Day2/star4.js";
import star5 from "./Day3/star5.js";
import star6 from "./Day3/star6.js";
import star7 from "./Day4/star7.js";
import star8 from "./Day4/star8.js";
import star10 from "./Day5/star10.js";
import star9 from "./Day5/star9.js";
import star11 from "./Day6/star11.js";
import star12 from "./Day6/star12.js";
import star13 from "./Day7/star13.js";
import star14 from "./Day7/star14.js";
import star15 from "./Day8/star15.js";
import star16 from "./Day8/star16.js";
import star17 from "./Day9/star17.js";
import star18 from "./Day9/star18.js";

const starray = [
  star1,
  star2,
  star3,
  star4,
  star5,
  star6,
  star7,
  star8,
  star9,
  star10,
  star11,
  star12,
  star13,
  star14,
  star15,
  star16,
  star17,
  star18,
  star19,
  star20,
  star21,
  star22,
  star23,
  star24,
];

const invalidArguments = () => {
  console.log("Invalid argument. Please read the README.");
};

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
  } else if (cliArg.startsWith("day")) {
    solveDay(argNumber);
  } else {
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
  if (dayNumber > starray.length / 2) {
    console.log("requested star number not implemented yet.");
    return;
  }
  const firstStarNumber = 1 + 2 * (dayNumber - 1);
  const secondStarNumber = 2 + 2 * (dayNumber - 1);
  const firstResult = starray[firstStarNumber - 1]();
  const secondResult = starray[secondStarNumber - 1]();

  console.log(`Day ${dayNumber} results...`);
  console.log(`first star: ${firstResult}`);
  console.log(`second star: ${secondResult}`);
};

execute();
