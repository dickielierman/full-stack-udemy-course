// Function to calculate BMI (Body Mass Index)
function bmiCalculator(weight, height) {
  // Calculate BMI using the formula
  const bmi = weight / Math.pow(height, 2);

  // Round the calculated BMI and return the result
  return Math.round(bmi);
}

// Example usage of the bmiCalculator function with weight 65 and height 1.8
console.log(bmiCalculator(65, 1.8));
