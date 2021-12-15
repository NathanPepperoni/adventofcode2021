import loadPuzzleInput from "../utils/loadPuzzleInput.js";


const step = (polymer, pairMapping) => {
  let newPolymer = "";
  for (let i = 0; i < polymer.length - 1; i++) {
    const chunk = polymer[i] + polymer[i + 1];
    if (pairMapping.has(chunk)) {
      newPolymer += polymer[i] + pairMapping.get(chunk);
      if (i + 1 >= polymer.length - 1) {
        newPolymer += polymer[i + 1];
      }
    } else {
      newPolymer += polymer[i + 1];
    }
  }

  return newPolymer;
};

const knollElements = (polymer) => {
  const map = new Map();
  for (let i = 0; i < polymer.length; i++) {
    if (map.has(polymer[i])) {
      map.set(polymer[i], map.get(polymer[i]) + 1);
    } else {
      map.set(polymer[i], 1);
    }
  }

  return map;
};

function star27() {
  const input = loadPuzzleInput(14, "\n\n");

  const template = input[0];
  const pairs = input[1]
    .split("\n")
    .filter((row) => row.length)
    .map((pair) => pair.split(" -> "));

  const pairMapping = new Map();
  pairs.forEach((pair) => pairMapping.set(pair[0], pair[1]));

  const steps = 10;
  let polymer = template;
  for (let stepCount = 0; stepCount < steps; stepCount++) {
    polymer = step(polymer, pairMapping);
  }

  let minElement = Number.MAX_SAFE_INTEGER;
  let maxElement = Number.MIN_SAFE_INTEGER;
  const knolledElements = knollElements(polymer);

  knolledElements.forEach((value, key) => {
    if (value > maxElement) {
      maxElement = value;
    }
    if (value < minElement) {
      minElement = value;
    }
  });

  return maxElement - minElement;
}

export default star27;
