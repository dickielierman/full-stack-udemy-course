function sing99Bottles() {
  let numOfBottles = 99;

  while (numOfBottles >= 0) {
    // Determine pluralization based on the number of bottles
    const pluralize = numOfBottles !== 1 ? 's' : '';

    // Convert the number of bottles to text
    const nobText = numOfBottles !== 0 ? numOfBottles : 'No more';

    // Display the current verse
    console.log(`${nobText} bottle${pluralize} of beer on the wall, ${nobText.toString().toLowerCase()} bottle${pluralize} of beer.`);

    if (numOfBottles > 0) {
      // If there are still bottles, display the next verse
      numOfBottles--;

      // Determine pluralization for the next verse
      const nextPluralize = numOfBottles !== 1 ? 's' : '';

      // Convert the number of bottles for the next verse to text
      const nextNobText = numOfBottles !== 0 ? numOfBottles : 'no more';

      console.log(`Take one down and pass it around, ${nextNobText} bottle${nextPluralize} of beer on the wall.`);
    } else {
      // If there are no more bottles, reset to 99 and display the final verse
      numOfBottles = 99;
      console.log(`Go to the store and buy some more, ${numOfBottles} bottles of beer on the wall.`);
      numOfBottles = -1; // Set to -1 to exit the loop
    }
  }
}

// Call the function to sing the song
sing99Bottles();
