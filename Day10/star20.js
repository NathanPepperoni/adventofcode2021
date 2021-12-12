import loadPuzzleInput from "../utils/loadPuzzleInput.js";

const openers = ["(", "{", "[", "<"];
const openerMap = {
  "(": ")",
  "{": "}",
  "[": "]",
  "<": ">",
};
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

const sumClosers = (errors) => {
  let sum = 0;
  errors.forEach((error) => {
    sum *= 5;
    switch (error) {
      case ")":
        sum += 1;
        break;
      case "]":
        sum += 2;
        break;
      case "}":
        sum += 3;
        break;
      case ">":
        sum += 4;
        break;
    }
  });

  return sum;
};

const completeChunk = (chunk) => {
  const up = [];
  for (let i = 0; i < chunk.length; i++) {
    const char = chunk[i];
    if (openers.includes(char)) {
      up.push(char);
    } else {
      up.pop();
    }
  }
  up.reverse();
  const closers = up.map((delimiter) => openerMap[delimiter]);

  return sumClosers(closers);
};

function star20() {
  const chunks = loadPuzzleInput(10).filter((row) => row.length);

  let scores = [];

  chunks
    .filter((chunk) => !findInvalidCharInChunk(chunk))
    .forEach((chunk) => {
      scores.push(completeChunk(chunk));
    });

  scores.sort((a, b) => a - b);
  return scores[Math.floor(scores.length / 2)];
}

export default star20;
