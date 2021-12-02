import loadPuzzleInput from "../utils/loadPuzzleInput.js";

function star4() {
  const movements = loadPuzzleInput(2);

  let hPosition = 0;
  let depth = 0;
  let aim = 0;

  movements.forEach((movement) => {
    const firstLetter = movement[0];
    const magnitude = Number.parseInt(movement.split(" ")[1]);
    switch (firstLetter) {
      case "f":
        hPosition += magnitude;
        depth += aim * magnitude;
        break;
      case "d":
        aim += magnitude;
        break;
      case "u":
        aim -= magnitude;
        break;
      default:
        break;
    }
  });

  return depth * hPosition;
}

export default star4;
