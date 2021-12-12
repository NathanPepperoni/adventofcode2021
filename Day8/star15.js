import loadPuzzleInput from "../utils/loadPuzzleInput.js";


function star15() {
  const input = loadPuzzleInput(8).filter(row => row.length).map(row => row.split(" | "));

  let ones = 0;
  let fours = 0;
  let sevens = 0;
  let eights = 0;

  input.forEach(element => {
    const display = element[1];
    display.split(" ").forEach(digit => {
      switch(digit.length) {
        case 2:
          ones++;
          break;
        case 4:
          fours++;
          break;
        case 3:
          sevens++;
          break;
        case 7:
          eights++;
          break;
      }
    })
  });

  return ones+fours+sevens+eights;
}

export default star15;