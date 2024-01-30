function isLeap(year) {
  // Check if the year is a leap year
  if ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0) {
    // If divisible by 4 and not divisible by 100, or divisible by 400, it's a leap year
    return 'Leap year.';
  } else {
    // Otherwise, it's not a leap year
    return 'Not leap year.';
  }
}
