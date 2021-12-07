import loadPuzzleInput from "../utils/loadPuzzleInput.js";

function star13() {
  const crabs = loadPuzzleInput(7, ",").map((num) => Number.parseInt(num));

  let minFuelUsed = Number.MAX_SAFE_INTEGER;
  for (let crabIndex = 0; crabIndex < crabs.length; crabIndex++) {
    let fuelUsed = 0;
    for (let subCrabIndex = 0; subCrabIndex < crabs.length; subCrabIndex++) {
      if (subCrabIndex !== crabIndex) {
        fuelUsed += Math.abs(crabs[subCrabIndex] - crabs[crabIndex]);
      }
    }
    minFuelUsed = Math.min(minFuelUsed, fuelUsed);
  }

  return minFuelUsed;
}

export default star13;
