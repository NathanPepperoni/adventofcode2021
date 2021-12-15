import loadPuzzleInput from "../utils/loadPuzzleInput.js";

const step = (polymerMap, pairMap) => {
  const newPolymerMap = new Map();

  polymerMap.forEach((value, key) => {
    const resultant1 = key[0] + pairMap.get(key);
    const resultant2 = pairMap.get(key) + key[1];

    addToMap(newPolymerMap, resultant1, value);
    addToMap(newPolymerMap, resultant2, value);
  });

  return newPolymerMap;
};

const polymaporizeString = (string) => {
  const map = new Map();
  for (let i = 0; i < string.length - 1; i++) {
    const pair = string[i] + string[i + 1];
    addToMap(map, pair);
  }

  return map;
};

const addToMap = (map, key, value = 1) => {
  if (map.has(key)) {
    map.set(key, value + map.get(key));
  }
  else {
    map.set(key, value);
  }
}

const knollLetters = (polymerMap, lastLetter) => {
  const letterMap = new Map();
  letterMap.set(lastLetter, 1);

  polymerMap.forEach((value, key) => {
    addToMap(letterMap, key[0], value);
    addToMap(letterMap, key[1], value);
  });

  return letterMap;
};

function star28() {
  const input = loadPuzzleInput(14, "\n\n");

  const template = input[0];
  const pairs = input[1]
    .split("\n")
    .filter((row) => row.length)
    .map((pair) => pair.split(" -> "));

  const pairMap = new Map();
  pairs.forEach((pair) => pairMap.set(pair[0], pair[1]));

  let polymerMap = polymaporizeString(template);

  for (let steps = 0; steps < 40; steps++) {
    polymerMap = step(polymerMap, pairMap);
  }

  const finalKnoll = knollLetters(polymerMap, template[template.length - 1]);

  let minElement = Number.MAX_SAFE_INTEGER;
  let maxElement = Number.MIN_SAFE_INTEGER;

  finalKnoll.forEach((value) => {
    if (value > maxElement) {
      maxElement = value;
    }
    if (value < minElement) {
      minElement = value;
    }
  });

  return (maxElement - minElement) / 2;
}

export default star28;
