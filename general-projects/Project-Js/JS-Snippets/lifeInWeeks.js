function lifeInWeeks(age) {
  /************Don't change the code above************/
  const lifeExpect = 90;
  const remainingYears = lifeExpect - age;
  const daysToLive = remainingYears * 365;
  const weeksToLive = remainingYears * 52;
  const monthsToLive = remainingYears * 12;
  console.log(`You have ${daysToLive} days, ${weeksToLive} weeks, and ${monthsToLive} months left.`);
  /*************Don't change the code below**********/
}
console.log(lifeInWeeks(44));
