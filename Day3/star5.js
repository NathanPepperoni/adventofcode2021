import loadPuzzleInput from "../utils/loadPuzzleInput.js";

const createGammaAndEpsilon = (sums) => {
  let gamma = "";
  let epsilon = "";
  sums.forEach((sum) => {
    if (sum >= 0.5) {
      gamma += "1";
      epsilon += "0";
    } else {
      gamma += "0";
      epsilon += "1";
    }
  });

  return { gamma: Number.parseInt(gamma, 2), epsilon: Number.parseInt(epsilon, 2) };
};

function star5() {
  const diagnostics = loadPuzzleInput(3);

  const sums = new Array(diagnostics[0].trim().length).fill(0);

  diagnostics.forEach((binary) => {
    for (let i = 0; i < binary.length - 1; i++) {
      sums[i] += Number.parseInt(binary[i]);
    }
  });

  const { gamma, epsilon } = createGammaAndEpsilon(sums.map((sum) => sum / diagnostics.length));

  return gamma * epsilon;
}

export default star5;
