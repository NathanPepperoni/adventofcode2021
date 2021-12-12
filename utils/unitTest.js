import assert from "assert";
import starray from "./starray.js";

const assertStar = (starNumber, expected, received) => {
  const message = `star${starNumber} result failed. Expected ${expected} and received ${received}`;
  assert(received === expected, message);
};

const expectedArray = [
  1477, 1523, 1383564, 1488311643, 3429254, 5410338, 51034, 5434, 7473, 24164, 360610, 1631629590423, 343468, 96086265,
  288, 940724, 478, 1327014, 341823, 2801302861, 1700, 273, 4773, 116985,
];

for (let star = 0; star < starray.length; star++) {
  assertStar(star + 1, expectedArray[star], starray[star]());
}

console.log("assertions passed!");
