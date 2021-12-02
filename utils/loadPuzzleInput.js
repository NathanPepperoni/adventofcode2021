import fs from "fs";

const loadPuzzleInput = (dayNumber, splitString = "\n") => {
  const fileString = fs.readFileSync(`./Day${dayNumber}/input.txt`, { encoding: "utf8", flag: "r" });
  return fileString.split(splitString);
};

export default loadPuzzleInput;
