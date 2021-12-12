import loadPuzzleInput from "../utils/loadPuzzleInput.js";

// lowPoint = [row, col]
const processBasin = (lowPoint, gridmap) => {
  const firstRow = 0;
  const lastRow = gridmap.length - 1;
  const firstCol = 0;
  const lastCol = gridmap[0].length - 1;

  const basinPoints = new Set([JSON.stringify(lowPoint)]);
  let pointQueue = [lowPoint];

  // breadthfirst get basin
  while (pointQueue.length > 0) {
    let newQueue = [];
    pointQueue.forEach((point) => {
      const row = point[0];
      const col = point[1];
      const value = gridmap[row][col];

      const up = row !== firstRow ? gridmap[row - 1][col] : 9;
      const right = col !== lastCol ? gridmap[row][col + 1] : 9;
      const down = row !== lastRow ? gridmap[row + 1][col] : 9;
      const left = col !== firstCol ? gridmap[row][col - 1] : 9;

      if (up > value && up !== 9) {
        const point = [row - 1, col];
        newQueue.push(point);
        basinPoints.add(JSON.stringify(point));
      }
      if (right > value && right !== 9) {
        const point = [row, col + 1];
        newQueue.push(point);
        basinPoints.add(JSON.stringify(point));
      }
      if (down > value && down !== 9) {
        const point = [row + 1, col];
        newQueue.push(point);
        basinPoints.add(JSON.stringify(point));
      }
      if (left > value && left !== 9) {
        const point = [row, col - 1];
        newQueue.push(point);
        basinPoints.add(JSON.stringify(point));
      }
    });
    pointQueue = newQueue;
  }

  const basinSize = basinPoints.size;
  // replace basin with 9s
  basinPoints.forEach((pointString) => {
    const point = JSON.parse(pointString);
    gridmap[point[0]][point[1]] = 9;
  });

  return basinSize;
};

function star18() {
  const heightmap = loadPuzzleInput(9);

  const gridmap = [];
  heightmap
    .filter((row) => row.length)
    .forEach((row) => gridmap.push(row.split("").map((item) => Number.parseInt(item))));

  const basinSizes = [];

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
        basinSizes.push(processBasin([row, col], gridmap));
      }
    }
  }

  return basinSizes.sort((a,b) => a-b).slice(-3).reduce((acc, cur) => acc*cur);
}

export default star18;
