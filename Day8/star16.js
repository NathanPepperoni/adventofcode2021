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

const isValid = (configuration, patterns) => {
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

  let wholeMatch = true;
  for (let index = 0; index < patterns.length; index++) {
    const pattern = patterns[index];
    const convertedPattern = convert(configuration, pattern);
    let letterMatch = false;
    for (let letter = 0; letter < 10; letter++) {
      if (JSON.stringify(letters[letter]) === JSON.stringify(convertedPattern)) {
        letterMatch = true;
      }
    }
    wholeMatch = wholeMatch && letterMatch;
  }
  return wholeMatch;
};

const bruteForceConfig = (patterns) => {
  const sequence = [0, 1, 2, 3, 4, 5, 6];

  // I'm not even remotely proud of this. It's not even the best way to brute force it, but here we are.
  let configuration;
  sequence.forEach((firstDigit) => {
    sequence
      .filter((digit) => digit !== firstDigit)
      .forEach((secondDigit) => {
        sequence
          .filter((digit) => ![firstDigit, secondDigit].includes(digit))
          .forEach((thirdDigit) => {
            sequence
              .filter((digit) => ![firstDigit, secondDigit, thirdDigit].includes(digit))
              .forEach((fourthDigit) => {
                sequence
                  .filter((digit) => ![firstDigit, secondDigit, thirdDigit, fourthDigit].includes(digit))
                  .forEach((fifthDigit) => {
                    sequence
                      .filter(
                        (digit) => ![firstDigit, secondDigit, thirdDigit, fourthDigit, fifthDigit].includes(digit)
                      )
                      .forEach((sixthDigit) => {
                        sequence
                          .filter(
                            (digit) =>
                              ![firstDigit, secondDigit, thirdDigit, fourthDigit, fifthDigit, sixthDigit].includes(
                                digit
                              )
                          )
                          .forEach((seventhDigit) => {
                            const config = [
                              firstDigit,
                              secondDigit,
                              thirdDigit,
                              fourthDigit,
                              fifthDigit,
                              sixthDigit,
                              seventhDigit,
                            ];
                            if (isValid(config, patterns)) {
                              configuration = config;
                            }
                          });
                      });
                  });
              });
          });
      });
  });

  return configuration;
};

function star16() {
  const input = loadPuzzleInput(8)
    .filter((row) => row.length)
    .map((row) => row.split(" | "));

  let sum = 0;
  input.forEach((element) => {
    const patterns = element[0].split(" ");
    const output = element[1].split(" ");

    const config = bruteForceConfig(patterns);
    sum += convertOutputToSum(output, config);
  });

  return sum;
}

export default star16;
