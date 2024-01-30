// Function to calculate BMI (Body Mass Index) and provide weight status
function bmiCalculator(weight, height) {
  // Calculate BMI using the formula
  let bmi = weight / Math.pow(height, 2);

  // Round the calculated BMI to the nearest whole number
  bmi = Math.round(bmi);

  // Determine the weight status based on the BMI
  if (bmi < 18.5) {
    return `Your BMI is ${bmi}, so you are underweight.`;
  } else if (bmi < 24.9) {
    return `Your BMI is ${bmi}, so you have a normal weight.`;
  } else {
    return `Your BMI is ${bmi}, so you are overweight.`;
  }
}

// Example usage of the bmiCalculator function with weight 65 and height 1.8
console.log(bmiCalculator(65, 1.8));
