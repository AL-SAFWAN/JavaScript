function linearSearch(arr, num) {
  for (var j = 0; j < arr.length; j++) {
    if (arr[j] === num) return j;
  }
  return -1;
}

console.log(linearSearch([1, 2, 3, 54], 54));
