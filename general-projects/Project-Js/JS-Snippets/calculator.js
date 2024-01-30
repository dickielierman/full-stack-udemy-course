// Function to add two numbers
function add(num1, num2) {
  return num1 + num2;
}

// Function to subtract num2 from num1
function subtract(num1, num2) {
  return num1 - num2;
}

// Function to multiply two numbers
function multiply(num1, num2) {
  return num1 * num2;
}

// Function to divide num1 by num2
function divide(num1, num2) {
  return num1 / num2;
}

// Higher-order function to perform a calculation based on the provided operator function
function calculator(operator, num1, num2) {
  // Call the provided operator function with the given numbers
  return operator(num1, num2);
}

// Example usage of the calculator function with addition
const result = calculator(add, 5, 3);
console.log(result); // Output: 8
