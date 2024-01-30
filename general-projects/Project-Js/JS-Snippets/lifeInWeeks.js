function lifeInWeeks(age) {
  // Define the life expectancy
  const lifeExpect = 90;

  // Calculate the remaining years, days, weeks, and months
  const remainingYears = lifeExpect - age;
  const daysToLive = remainingYears * 365;
  const weeksToLive = remainingYears * 52;
  const monthsToLive = remainingYears * 12;

  // Log the results
  console.log(`You have ${daysToLive} days, ${weeksToLive} weeks, and ${monthsToLive} months left.`);
}

// Call the function with an example age and log the result
console.log(lifeInWeeks(44));
