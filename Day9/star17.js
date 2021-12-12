import loadPuzzleInput from "../utils/loadPuzzleInput.js";

function star17() {
  const heightmap = loadPuzzleInput(9);

  const gridmap = [];
  heightmap.filter(row => row.length).forEach((row) => gridmap.push(row.split("").map(item => Number.parseInt(item))));

  let riskLevelSum = 0;

  const firstRow = 0;
  const lastRow = gridmap.length - 1;
  const firstCol = 0;
  const lastCol = gridmap[0].length - 1;
  for (let row = 0; row < gridmap.length; row++) {
    for (let col = 0; col < gridmap[0].length; col++) {
      const up = row !== firstRow ? gridmap[row - 1][col] : Number.MAX_SAFE_INTEGER;
      const right = col !== lastCol ? gridmap[row][col + 1] : Number.MAX_SAFE_INTEGER;
      const down = row !== lastRow ? gridmap[row + 1][col] : Number.MAX_SAFE_INTEGER;
      const left = col !== firstCol ? gridmap[row][col - 1] : Number.MAX_SAFE_INTEGER;

      const value = gridmap[row][col];
      if (value < up && value < right && value < down && value < left) {
        const riskLevel = 1 + value;
        riskLevelSum += riskLevel;
      }
    }
  }

  return riskLevelSum;
}

export default star17;
