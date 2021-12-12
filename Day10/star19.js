import loadPuzzleInput from "../utils/loadPuzzleInput.js";

const openers = ["(", "{", "[", "<"];
const closerMap = {
  ")": "(",
  "}": "{",
  "]": "[",
  ">": "<",
};

const findInvalidCharInChunk = (chunk) => {
  const up = [];
  for (let i = 0; i < chunk.length; i++) {
    const char = chunk[i];
    if (openers.includes(char)) {
      up.push(char);
    } else {
      const expectedUp = up.pop();
      if (expectedUp !== closerMap[char]) {
        return char;
      }
    }
  }
};

const sumErrors = (errors) => {
  let sum = 0;
  errors.forEach((error) => {
    switch (error) {
      case ")":
        sum += 3;
        break;
      case "]":
        sum += 57;
        break;
      case "}":
        sum += 1197;
        break;
      case ">":
        sum += 25137;
        break;
    }
  });

  return sum;
};

function star19() {
  const chunks = loadPuzzleInput(10).filter((row) => row.length);

  let suprises = [];

  chunks.forEach((chunk) => {
    const invalid = findInvalidCharInChunk(chunk);
    if (invalid) {
      suprises.push(invalid);
    }
  });

  return sumErrors(suprises);
}

export default star19;
