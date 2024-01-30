function fibonacciGenerator(n) {
  // Base cases for n = 1 and n = 2
  if (n === 1) {
    return [0];
  } else if (n === 2) {
    return [0, 1];
  } else {
    // Initialize the output array with the first two Fibonacci numbers
    var output = [0, 1];

    // Loop to generate the remaining Fibonacci numbers
    for (var i = 2; i < n; i++) {
      // Get the last two numbers in the output array
      var lastTwo = output.slice(-2);

      // Calculate the next Fibonacci number
      var newNum = lastTwo[0] + lastTwo[1];

      // Add the new number to the output array
      output.push(newNum);
    }
  }

  // Return the array of Fibonacci numbers
  return output;
}

// Call the function with n = 7
fibonacciGenerator(7);
