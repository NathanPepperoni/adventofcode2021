import loadPuzzleInput from "../utils/loadPuzzleInput.js";

const rotateMatrix = (matrix) => {
  const matrixCopy = JSON.parse(JSON.stringify(matrix));
  const N = matrixCopy.length;
  for (let x = 0; x < N / 2; x++) {
    for (let y = x; y < N - x - 1; y++) {
      const temp = matrixCopy[x][y];

      matrixCopy[x][y] = matrixCopy[y][N - 1 - x];
      matrixCopy[y][N - 1 - x] = matrixCopy[N - 1 - x][N - 1 - y];
      matrixCopy[N - 1 - x][N - 1 - y] = matrixCopy[N - 1 - y][x];
      matrixCopy[N - 1 - y][x] = temp;
    }
  }
  return matrixCopy;
};

const createMatrix = (rows) => {
  const matrix = [];
  const sanitizedRows = rows.filter((row) => row.length);
  sanitizedRows.forEach((row) => {
    const numRow = [];
    row
      .split(" ")
      .filter((num) => num.length)
      .forEach((num) => numRow.push(num));
    matrix.push(numRow);
  });
  return matrix;
};

class Board {
  constructor(matrix) {
    this.horizontal = matrix;
    this.vertical = rotateMatrix(matrix);
    this.size = matrix.length;
  }

  callNumber(number) {
    const predicate = (num) => num !== number;

    for (let i = 0; i < this.size; i++) {
      this.horizontal[i] = this.horizontal[i].filter(predicate);
      this.vertical[i] = this.vertical[i].filter(predicate);
    }
  }

  checkVictory() {
    const horizontalVictory = !!this.horizontal.find((item) => !item.length);
    const verticalVictory = !!this.vertical.find((item) => !item.length);
    return horizontalVictory || verticalVictory;
  }

  sumRemaining() {
    let sum = 0;
    this.horizontal.forEach((row) => row.forEach((num) => (sum += Number.parseInt(num))));
    return sum;
  }
}

function star7() {
  const input = loadPuzzleInput(4, "\n\n");

  const calls = input[0].split(",");
  const matrices = input.slice(1).map((boardString) => createMatrix(boardString.split("\n")));
  const boards = [];
  matrices.forEach((matrix) => boards.push(new Board(matrix)));

  for (let callIndex = 0; callIndex < calls.length; callIndex++) {
    const call = calls[callIndex];
    for (let boardIndex = 0; boardIndex < boards.length; boardIndex++) {
      const board = boards[boardIndex];
      board.callNumber(call);
      if (board.checkVictory()) {
        return board.sumRemaining() * call;
      }
    }
  }

  return;
}

export default star7;
