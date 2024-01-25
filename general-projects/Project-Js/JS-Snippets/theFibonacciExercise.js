function fibonacciGenerator(n) {
  //Do NOT change any of the code above 👆

  //Write your code here:
  if (n == 1) {
    return [0];
  } else if (n == 2) {
    return [0, 1];
  } else {
    var output = [0, 1];
    for (var i = 2; i < n; i++) {
      var lastTwo = output.slice(-2);
      var newNum = lastTwo[0] + lastTwo[1];
      output.push(newNum);
    }
  }
  return output;
  //Return an array of fibonacci numbers starting from 0.

  //Do NOT change any of the code below 👇
}
fibonacciGenerator(7);
