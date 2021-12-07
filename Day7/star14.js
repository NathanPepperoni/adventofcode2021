import loadPuzzleInput from "../utils/loadPuzzleInput.js";

function star14() {
  const crabs = loadPuzzleInput(7, ",").map((num) => Number.parseInt(num));

  const maxCrabPosition = Math.max(...crabs);

  let minFuelUsed = Number.MAX_SAFE_INTEGER;
  for (let position = 0; position < maxCrabPosition; position++) {
    let fuelUsed = 0;
    for (let subCrabIndex = 0; subCrabIndex < crabs.length; subCrabIndex++) {
      const movement = Math.abs(crabs[subCrabIndex] - position);
      fuelUsed += (movement * (movement + 1)) / 2;
    }
    minFuelUsed = Math.min(minFuelUsed, fuelUsed);
  }

  return minFuelUsed;
}

export default star14;
