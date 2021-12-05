import assert from "assert";

import star1 from "../Day1/star1.js";
import star2 from "../Day1/star2.js";
import star3 from "../Day2/star3.js";
import star4 from "../Day2/star4.js";
import star5 from "../Day3/star5.js";
import star6 from "../Day3/star6.js";
import star7 from "../Day4/star7.js";
import star8 from "../Day4/star8.js";

const assertStar = (starNumber, expected, received) => {
  const message = `star${starNumber} result failed. Expected ${expected} and received ${received}`;
  assert(received === expected, message);
};

const expectedArray = [1477, 1523, 1383564, 1488311643, 3429254, 5410338, 51034, 5434];
const starray = [star1, star2, star3, star4, star5, star6, star7, star8];

for (let star = 0; star < starray.length; star++) {
  assertStar(star + 1, expectedArray[star], starray[star]());
}

console.log("assertions passed!");
