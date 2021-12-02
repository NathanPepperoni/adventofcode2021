import loadPuzzleInput from "../utils/loadPuzzleInput.js";

function star3() {
  const movements = loadPuzzleInput(2);

  let hPosition = 0;
  let depth = 0;

  movements.forEach((movement) => {
    const firstLetter = movement[0];
    const magnitude = Number.parseInt(movement.split(" ")[1]);
    switch (firstLetter) {
      case "f":
        hPosition += magnitude;
        break;
      case "d":
        depth += magnitude;
        break;
      case "u":
        depth -= magnitude;
        break;
      default:
        break;
    }
  });

  return depth * hPosition;
}

export default star3;
