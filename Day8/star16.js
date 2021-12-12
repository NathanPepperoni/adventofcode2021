import loadPuzzleInput from "../utils/loadPuzzleInput.js";

const convert = (config, digit) => {
  const map = {
    a: 0,
    b: 1,
    c: 2,
    d: 3,
    e: 4,
    f: 5,
    g: 6,
  };
  const digitArray = digit.split("").map((char) => map[char]);
  const convertedDigit = digitArray
    .map((digitNum) => config.findIndex((elem) => elem === digitNum))
    .sort((a, b) => a - b);
  return convertedDigit;
};

const convertOutputToSum = (output, config) => {
  const letters = {
    0: [0, 1, 2, 4, 5, 6],
    1: [2, 5],
    2: [0, 2, 3, 4, 6],
    3: [0, 2, 3, 5, 6],
    4: [1, 2, 3, 5],
    5: [0, 1, 3, 5, 6],
    6: [0, 1, 3, 4, 5, 6],
    7: [0, 2, 5],
    8: [0, 1, 2, 3, 4, 5, 6],
    9: [0, 1, 2, 3, 5, 6],
  };

  let digitString = "";
  output.forEach((digit) => {
    const convertedDigit = convert(config, digit);
    for (let letter = 0; letter < 10; letter++) {
      if (JSON.stringify(convertedDigit) === JSON.stringify(letters[letter])) {
        digitString += letter.toString();
      }
    }
  });
  return Number.parseInt(digitString);
};

const countInPatterns = (letter, patterns) => {
  
  return patterns.reduce((acc, curr) => {
    if (curr.includes(letter)) {
      return acc + 1;
    }
    return acc;
  }, 0);
};

const matchingDigit = (digit1, digit2) => {
  if (digit1.length !== digit2.length) {
    return false;
  }

  for (let i = 0; i < digit1.length; i++) {
    if (!digit1.includes(digit2[i])) {
      return false;
    }
  }
  return true;
}

function star16() {
  const input = loadPuzzleInput(8)
    .filter((row) => row.length)
    .map((row) => row.split(" | "));

  let sum = 0;
  input.forEach((element) => {
    const patterns = element[0].split(" ");
    const output = element[1].split(" ");

    let a, b, c, d, e, f, g;

    const one = patterns.filter((pattern) => pattern.length === 2)[0];
    const four = patterns.filter((pattern) => pattern.length === 4)[0];
    const seven = patterns.filter((pattern) => pattern.length === 3)[0];
    const eight = patterns.filter((pattern) => pattern.length === 7)[0];

    if (countInPatterns(one[0], patterns) === 9) {
      f = one[0];
      c = one[1];
    } else {
      f = one[1];
      c = one[0];
    }

    eight.split("").forEach((char) => {
      if (countInPatterns(char, patterns) === 6) {
        b = char;
      }
      if (countInPatterns(char, patterns) === 4) {
        e = char;
      }
    });

    four.split("").forEach((char) => {
      if (countInPatterns(char, patterns) === 6) {
        b = char;
      }
    });

    seven.split("").forEach((char) => {
      if (!one.includes(char)) {
        a = char;
      }
    });

    four.split("").forEach((char) => {
      if (![b, c, f].includes(char)) {
        d = char;
      }
    });

    eight.split("").forEach((char) => {
      if (![a, b, c, d, e, f].includes(char)) {
        g = char;
      }
    });

    const zero =  `${a}${b}${c}${e}${f}${g}`
    const two = `${a}${c}${d}${e}${g}`;
    const three = `${a}${c}${d}${f}${g}`
    const five = `${a}${b}${d}${f}${g}`
    const six = `${a}${b}${d}${e}${f}${g}`
    const nine = `${a}${b}${c}${d}${f}${g}`


    let outputString = ""
    const nums = [zero, one, two, three, four, five, six, seven, eight, nine]
    output.forEach(digit => {
      for (let i = 0; i < 10; i++) {
        if (matchingDigit(digit, nums[i])) {
          outputString += i.toString();
        }
      }
    })
    sum += Number.parseInt(outputString);
  });

  return sum;
}

export default star16;
