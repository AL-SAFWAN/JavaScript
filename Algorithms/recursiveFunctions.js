function countDown(num) {
  if (num <= 0) {
    console.log("done");
    return;
  }
  console.log(num);
  num--;
  countDown(num);
}

function factorial(num) {
  if (num === 1) return 1;
  return num * factorial(num);
}

console.log(factorial(4));
countDown(10);
