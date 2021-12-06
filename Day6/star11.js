import loadPuzzleInput from "../utils/loadPuzzleInput.js";

function star11() {
  const initialState = loadPuzzleInput(6, ",");

  let currentState = initialState;
  let newState = [];
  for (let day = 1; day <= 80; day++) {
    currentState.forEach((fishTimer) => {
      if (fishTimer === 0) {
        newState.push(6);
        newState.push(8);
      } else {
        newState.push(fishTimer - 1);
      }
    });
    currentState = newState;
    newState = [];
  }

  return currentState.length;
}

export default star11;
