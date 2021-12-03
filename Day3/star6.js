import loadPuzzleInput from "../utils/loadPuzzleInput.js";

const calculateSums = (diagnostics) => {
  const sums = new Array(diagnostics[0].trim().length).fill(0);
  diagnostics.forEach((binary) => {
    for (let i = 0; i <= binary.length - 1; i++) {
      sums[i] += Number.parseInt(binary[i]);
    }
  });

  return sums.map((sum) => sum / diagnostics.length);
}

const siftDiagnostics = (sums, diagnostics, comparator) => {
  let i = 0;
  while (diagnostics.length > 1) {
    sums = calculateSums(diagnostics);
    if (comparator(sums[i])) {
      diagnostics = diagnostics.filter(sum => sum[i] === "1");
    }
    else {
      diagnostics = diagnostics.filter(sum => sum[i] === "0");
    }
    i++;
  }

  return Number.parseInt(diagnostics[0], 2);
}

function star6() {
  const diagnostics = loadPuzzleInput(3);

  const sumData = calculateSums(diagnostics);
  const genRating = siftDiagnostics(sumData, diagnostics, sum => sum >= .5);
  const o2Rating = siftDiagnostics(sumData, diagnostics, sum => sum < .5);

  return genRating * o2Rating;
}

export default star6;
