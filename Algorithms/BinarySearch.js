/*
Sorted array - 
left pointer 
right pointer

while the left pointer comes before the right pointer 
create a pointer in the middle 
if you find the value return the index 
if too small left pointer ++ 
if too bug right pointer -- 
not found -1 
*/

function BinarySearch(array, lookNum) {
  let leftPointer = 0;
  let rightPointer = array.length - 1;
  let middlePointer = Math.floor((rightPointer + leftPointer) / 2);

  while (array[middlePointer] !== lookNum && leftPointer < middlePointer) {
    if (lookNum < array[middlePointer]) {
      rightPointer = middlePointer - 1;
    } else {
      leftPointer = middlePointer + 1;
    }
    middlePointer = Math.floor((leftPointer + rightPointer) / 2);
  }
  if (array[middlePointer] == lookNum) {
    return middlePointer;
  } else {
    return -1;
  }
}

console.log(BinarySearch([1, 2, 3, 4, 54, 63, 85], 6433));
