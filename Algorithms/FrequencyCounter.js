/*
Write a function called same, which accepts two array
This function should return true if every value in the array has it's 
corresponding value squred in the second arry. the frequency of the value must ve same 
*/

function same(arr1, arr2) {
  // if there length is not the same return false
  if (arr1.length != arr2.length) return false;
  let frequencyCounter = {};
  let frequencyCounter2 = {};

  // 3 loops
  // loop 1 -> map the value to the object 1  [2,1,4] {2:1, 1:1 4:1}
  //   if it has a value or if its 0, then increment by 1
  //   (x || 0) + 1;

  // loop 2 ->  map the value to the object 2
  for (let i = 0; i < arr2.length; i++) {
    frequencyCounter2[arr2[i]] = (frequencyCounter2[arr2[i]] || 0) + 1;
  }

  // loop 3 -> compare the objects
  // This could be true or false
  for (let key in frequencyCounter) {
    console.log(key ** 2 in frequencyCounter2, key, frequencyCounter2);
    // check if a key is there that is squared in the squared frequency counter
    if (!(key ** 2 in frequencyCounter2)) return false;

    // check if the value of the square object !== value of the key object
    // this is to see the frequency is the same or not
    if (frequencyCounter2[key ** 2] !== frequencyCounter[key]) return false;
  }

  // final return state
  // this would be true as the if statement doesn't break
  return true;
}

const result = same([2, 2, 4], [4, 4, 16]);
console.log(result);

function arrayDiff(a, b) {
  if (!a.length || !b.length) return a;

  let result = [];
  let frequencyCounter = {};

  for (let i = 0; i < b.length; i++) {
    frequencyCounter[b[i]] = true;
  }

  for (let num of a) {
    if (!frequencyCounter[num]) {
      result.push(num);
    }
  }

  return result;
}
