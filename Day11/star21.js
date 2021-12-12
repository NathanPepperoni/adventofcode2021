import loadPuzzleInput from "../utils/loadPuzzleInput.js";

const containsUncountedFlash = (grid) => {
  for (let row = 0; row < grid.length; row++) {
    for (let col = 0; col < grid[0].length; col++) {
      if (grid[row][col] > 9) {
        return true;
      }
    }
  }
};

const increaseAllInGrid = (grid) => {
  for (let row = 0; row < grid.length; row++) {
    for (let col = 0; col < grid[0].length; col++) {
      grid[row][col]++;
    }
  }
};

const calculateAndResetFlashes = (grid) => {
  let sum = 0;
  for (let row = 0; row < grid.length; row++) {
    for (let col = 0; col < grid[0].length; col++) {
      if (grid[row][col] === "X") {
        sum++;
        grid[row][col] = 0;
      }
    }
  }
  return sum;
};

const step = (grid) => {
  const firstRow = 0;
  const lastRow = grid.length - 1;
  const firstCol = 0;
  const lastCol = grid[0].length - 1;

  increaseAllInGrid(grid);
  while (containsUncountedFlash(grid)) {
    for (let row = 0; row < grid.length; row++) {
      for (let col = 0; col < grid[0].length; col++) {
        const value = grid[row][col];
        if (value !== "X" && value > 9) {
          grid[row][col] = "X";
          if (row !== firstRow) {
            if (grid[row - 1][col] !== "X") {
              grid[row - 1][col]++;
            }
          }
          if (row !== lastRow) {
            if (grid[row + 1][col] !== "X") {
              grid[row + 1][col]++;
            }
          }
          if (col !== firstCol) {
            if (grid[row][col - 1] !== "X") {
              grid[row][col - 1]++;
            }
          }
          if (col !== lastCol) {
            if (grid[row][col + 1] !== "X") {
              grid[row][col + 1]++;
            }
          }

          // diagonals
          if (col !== firstCol && row !== firstRow) {
            if (grid[row - 1][col - 1] !== "X") {
              grid[row - 1][col - 1]++;
            }
          }
          if (col !== lastCol && row !== firstRow) {
            if (grid[row - 1][col + 1] !== "X") {
              grid[row - 1][col + 1]++;
            }
          }
          if (col !== firstCol && row !== lastRow) {
            if (grid[row + 1][col - 1] !== "X") {
              grid[row + 1][col - 1]++;
            }
          }
          if (col !== lastCol && row !== lastRow) {
            if (grid[row + 1][col + 1] !== "X") {
              grid[row + 1][col + 1]++;
            }
          }
        }
      }
    }
  }

  return calculateAndResetFlashes(grid);
};

function star21() {
  const energyLevels = loadPuzzleInput(11).filter((row) => row.length);

  const energyGrid = [];

  energyLevels.forEach((row) => {
    energyGrid.push(row.split("").map((digit) => Number.parseInt(digit)));
  });

  const stepLimit = 100;

  let sumFlashes = 0;
  for (let steps = 0; steps < stepLimit; steps++) {
    const stepFlashes = step(energyGrid);
    sumFlashes += stepFlashes;
  }

  return sumFlashes;
}

export default star21;
