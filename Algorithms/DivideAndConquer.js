// give a sorted array
// write a function called search
// return an index where the value passed to the function is located

function search(arr, val) {
  let min = 0;
  let max = arr.length - 1;

  while (min <= max) {
    let middle = Math.floor((min + max) / 2);

    let currentElement = arr[middle];

    if (currentElement < val) {
      min = middle + 1;
    } else if (currentElement > val) {
      max = middle - 1;
    } else {
      return currentElement;
    }
  }
  return -1;
}

console.log(search([2, 3, 4, 5, 6, 7], 4));
