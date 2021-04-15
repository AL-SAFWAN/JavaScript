// write a function called sumZero
// accepts a sorted array
// find the first pair, where the sum is 0
// return an array that includes both values
// or return undefined

function sumZero(arr) {
  let pointerLeft = 0;
  let pointerRight = arr.length - 1;

  for (var i = 0; i < arr.length; i++) {
    const sum = arr[pointerLeft] + arr[pointerRight];
    if (pointerLeft < pointerRight) {
      if (!sum) {
        return [arr[pointerLeft], arr[pointerRight]];
      } else if (sum > 0) {
        pointerRight--;
      } else {
        pointerLeft++;
      }
    }
  }
}

// accepts sorted array of
// count the unique values in teh array. There van be negative number in the array
// return the number of unique values
// input [1,1,1,1,2,2,3,5,5] ,  returned as 4
function countUniqueValue(arr) {
  let count = 0;
  let currentPointer = 0;
  let searchPointer = 1;

  for (let i = 0; i < arr.length; i++) {
    // a pointer that is on the current unique value
    // a pointer that search for the unique value
    // when it find a different number then update the current
    let isMatching = arr[currentPointer] === arr[searchPointer];
    if (isMatching) {
      searchPointer++;
    } else {
      count++;
      currentPointer = searchPointer;
      searchPointer++;
    }
  }
  return count;
}
console.log(countUniqueValue([-3, -2, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 8]));
console.log(countUniqueValue([1, 1, 1, 1, 2, 2, 3, 5, 5]));
console.log(countUniqueValue([]));

console.log(sumZero([-3, -2, 1, 2, 3]));
