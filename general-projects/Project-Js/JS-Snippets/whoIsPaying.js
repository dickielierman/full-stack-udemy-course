function whosPaying(names) {
  // Generate a random number between 0 (inclusive) and the length of the names array (exclusive)
  const randomNum = Math.floor(Math.random() * names.length);

  // Return a string indicating who is going to buy lunch today
  return `${names[randomNum]} is going to buy lunch today!`;
}

// Example usage with an array of names
console.log(whosPaying(['Angela', 'Ben', 'Jenny', 'Michael', 'Chloe']));
