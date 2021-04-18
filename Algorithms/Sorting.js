//bubble sort
/*

 */
const swap = (arr, i1, i2) => {
  [arr[i1], arr[i2]] = [arr[i2], arr[i1]];
};
function bubbleSort(arr) {
  for (let i = arr.length; i >= 0; i--) {
    for (var j = 0; j < i - 1; j++) {
      if (arr[j] > arr[i]) {
        [arr[i], arr[j]] = [arr[j], arr[i]];
      }
    }
  }
  return arr;
}

// selection sort
function selectionSort(arr) {
  for (let i = 0; i < arr.length; i++) {
    var lowest = i;
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[j] < arr[lowest]) {
        lowest = j;
      }
      if (i !== lowest) {
        [arr[i], arr[lowest]] = [arr[lowest], arr[i]];
      }
    }
  }
  return arr;
}

// insertion sort
function insertionSort(arr) {
  for (let i = 0; i < arr.length; i++) {
    let currentValue = arr[i];
    for (var j = i - 1; j >= 0 && arr[j] > currentValue; j--) {
      arr[j + 1] = arr[j];
    }
    arr[j + 1] = currentValue;
  }

  return arr;
}

// merge sort
/**/
function merger(arr1, arr2) {
  let i = 0;
  let j = 0;
  let arr = [];
  // does it up to where they are equal in length
  while (i < arr1.length && j < arr2.length) {
    let compareILessK = arr1[i] <= arr2[j];

    if (compareILessK) {
      arr.push(arr1[i]);
      i++;
    } else {
      arr.push(arr2[j]);
      j++;
    }
  }
  while (i < arr1.length) {
    arr.push(arr1[i]);
    i++;
  }
  while (j < arr2.length) {
    arr.push(arr2[j]);
    j++;
  }
  return arr;
}

function mergeSort(arr) {
  if (arr.length <= 1) return arr;
  let mid = Math.floor(arr.length / 2);
  // keep splitting till <= 1
  let left = mergeSort(arr.slice(0, mid));
  let right = mergeSort(arr.slice(mid));
  return merger(left, right);
}

function pivot(arr, start = 0, end = arr.length + 1) {
  function swap(arr, i, j) {
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  let pivot = arr[start];
  var swapIndex = start;
  for (let i = start + 1; i <= end; i++) {
    // if the element is smaller than the pivot then swap
    // increment where the pivot need to swap
    if (arr[i] < pivot) {
      swapIndex++;
      swap(arr, swapIndex, i);
    }
  }
  // after is has looped, the place the position of the pivot
  swap(arr, start, swapIndex);
  return swapIndex;
}

// quick sort
function quickSort(arr, left = 0, right = arr.length - 1) {
  if (left < right) {
    let pivotIndex = pivot(arr, left, right);
    quickSort(arr, left, pivotIndex - 1);
    quickSort(arr, pivotIndex + 1, right);
  }

  return arr;
}

function getDigit(number, i) {
  return Math.floor(Math.abs(number) / Math.pow(10, i)) % 10;
}
function digitCount(num) {
  if (num === 0) return 1;
  return Math.floor(Math.log10(Math.abs(num))) + 1;
}

function mostDigit(arr) {
  let maxDigit = 0;
  for (let i = 0; i < arr.length; i++) {
    maxDigit = Math.max(maxDigit, digitCount(arr[i]));
  }
  return maxDigit;
}
// radix sort
function radixSort(arr) {
  let maxDigitCount = mostDigit(arr);
  for (let k = 0; k < maxDigitCount; k++) {
    let digitBucket = Array.from({ length: 10 }, () => []);
    for (let i = 0; i < arr.length; i++) {
      digitBucket[getDigit(arr[i], k)].push(arr[i]);
    }
    arr = [].concat(...digitBucket);
  }
  return arr;
}
console.log(
  radixSort([4, 458, 43562, 1, 534, 745, 6, 345, 19, 245, 45, 5, 6, 7, 8, 25])
);

// test
// console.log(bubbleSort([7, 3, 3, -4, 2]));
// console.log(selectionSort([7, 3, 3, -4, 2]));
// console.log(insertionSort([7, 3, 3, -4, 2]));

// console.log(mergeSort([19, 245, 45, 5, 6, 7, 8, 25]));
// console.log();
