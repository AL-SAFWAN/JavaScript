function maxSubarraySum(arr, n) {
  let currentMaxSum = 0;
  let tempMaxSum = 0;

  // init window
  for (var i = 0; i < n; i++) {
    tempMaxSum += arr[i];
  }
  currentMaxSum = tempMaxSum;
  for (var i = num; i < arr.length; i++) {
    // this will calculate the new sum for that widow
    tempMaxSum = tempMaxSum - arr[i - num] + arr[i];
    currentMaxSum = Math.max(currentMaxSum, tempMaxSum);
  }
  return currentMaxSum;
}
