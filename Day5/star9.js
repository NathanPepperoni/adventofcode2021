import loadPuzzleInput from "../utils/loadPuzzleInput.js";

const start = 0;
const end = 1;
const x = 0;
const y = 1;

const countOverlaps = (grid) => {
  let count = 0;
  grid.forEach((row) => {
    row.forEach((num) => {
      if (num >= 2) {
        count++;
      }
    });
  });
  return count;
};

function star9() {
  // line = [[beginX, beginY], [endX, endY]]
  const ventLines = loadPuzzleInput(5)
    .filter((numString) => numString.length)
    .map((line) => line.split(" -> ").map((point) => point.split(",").map((num) => Number.parseInt(num))));

  const gridSize = 1000;
  const grid = [...Array(gridSize)].map((x) => Array(gridSize).fill(0));

  ventLines.forEach((line) => {
    // if matching x, move y
    if (line[start][x] === line[end][x]) {
      const minY = Math.min(line[start][y], line[end][y]);
      const maxY = Math.max(line[start][y], line[end][y]);
      for (let yIndex = minY; yIndex <= maxY; yIndex++) {
        const curX = line[start][x];
        const curY = yIndex;
        grid[curY][curX] += 1;
      }
    }
    // if matching y, move x
    if (line[start][y] === line[end][y]) {
      const minX = Math.min(line[start][x], line[end][x]);
      const maxX = Math.max(line[start][x], line[end][x]);
      for (let xIndex = minX; xIndex <= maxX; xIndex++) {
        const curX = xIndex;
        const curY = line[start][y];
        grid[curY][curX] += 1;
      }
    }
  });
  
  return countOverlaps(grid);
}

export default star9;
