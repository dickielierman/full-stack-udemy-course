// Array to store FizzBuzz results
var output = [];

// Function to generate FizzBuzz values and update the output array
function fizzBuzz() {
  // Calculate the current iteration number based on the length of the output array
  thisIteration = output.length + 1;

  // Check divisibility by 3 and 5
  if (thisIteration % 3 === 0 && thisIteration % 5 === 0) {
    output.push('FizzBuzz');
  } else if (thisIteration % 3 === 0) {
    // Check divisibility by 3
    output.push('Fizz');
  } else if (thisIteration % 5 === 0) {
    // Check divisibility by 5
    output.push('Buzz');
  } else {
    // Default case: push the current iteration number
    output.push(thisIteration);
  }
}

// Iterate through numbers 1 to 20 and generate FizzBuzz values
for (let i = 0; i < 20; i++) {
  fizzBuzz();
}

// Display the FizzBuzz results
console.log(output);
