import loadPuzzleInput from "../utils/loadPuzzleInput.js";

const x = 0;
const y = 1;

const applyPoints = (points, grid) => {
  points.forEach((point) => {
    grid[point[y]][point[x]] = "#";
  });
};

const foldHamburgerStyle = (foldValue, grid) => {
  const linesToFold = grid.length - foldValue - 1;
  let linesFolded = 0;
  while (linesFolded < linesToFold) {
    const targetLine = foldValue - linesToFold + linesFolded;
    const foldLine = grid.pop();
    for (let col = 0; col < foldLine.length; col++) {
      if (foldLine[col] === "#") {
        grid[targetLine][col] = "#";
      }
    }
    linesFolded++;
  }
  grid.pop();
};

const removeRightColumns = (grid, number = 1) => {
  let removed = 0;
  while (removed < number) {
    grid.forEach((row) => row.pop());
    removed++;
  }
};

const foldHotdogStyle = (foldValue, grid) => {
  const linesToFold = grid[0].length - foldValue - 1;
  let linesFolded = 0;
  while (linesFolded < linesToFold) {
    const targetLine = foldValue - linesToFold + linesFolded;
    const foldIndex = grid[0].length - 1 - linesFolded;

    for (let row = 0; row < grid.length; row++) {
      if (grid[row][foldIndex] === "#") {
        grid[row][targetLine] = "#";
      }
    }
    linesFolded++;
  }
  removeRightColumns(grid, linesToFold + 1);
};

const foldPaper = (foldCommand, grid) => {
  const foldValue = foldCommand[1];
  if (foldCommand[0] === "y") {
    foldHamburgerStyle(foldValue, grid);
  } else {
    foldHotdogStyle(foldValue, grid);
  }
};

const countStars = (grid) => {
  return grid.reduce((acc, curr) => acc + curr.reduce((totalStars, cur) => totalStars + (cur === "#" ? 1 : 0), 0), 0);
};

function star25() {
  const input = loadPuzzleInput(13, "\n\n");
  const points = input[0].split("\n").map((point) => point.split(",").map((coord) => Number.parseInt(coord)));
  const folds = input[1]
    .split("\n")
    .filter((row) => row.length)
    .map((foldCommand) => foldCommand.replace("fold along ", "").split("="));

  let maxX = -1;
  let maxY = -1;

  points.forEach((point) => {
    maxX = Math.max(maxX, point[x]);
    maxY = Math.max(maxY, point[y]);
  });

  const paperGrid = [...Array(maxY + 1)].map((x) => Array(maxX + 1).fill("."));

  applyPoints(points, paperGrid);

  foldPaper(folds[0], paperGrid);

  return countStars(paperGrid);
}

export default star25;
