import loadPuzzleInput from "../utils/loadPuzzleInput.js";

function star12() {
  const initialState = loadPuzzleInput(6, ",").map((fishAge) => Number.parseInt(fishAge));

  const fishAges = new Array(9).fill(0);

  initialState.forEach((fish) => {
    fishAges[fish]++;
  });

  for (let day = 1; day <= 256; day++) {
    let newFish = fishAges[0];
    for (let fishAge = 0; fishAge < 8; fishAge++) {
      fishAges[fishAge] = fishAges[fishAge+1];
    }
    fishAges[8] = newFish;
    fishAges[6] = fishAges[6] + newFish;
  }

  return fishAges.reduce((fishSoFar, fishAtCurrentAge) => fishSoFar + fishAtCurrentAge);
}

export default star12;
