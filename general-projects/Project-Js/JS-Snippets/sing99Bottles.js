function sing99Bottles() {
  numOfBottles = 99;
  while (numOfBottles >= 0) {
    numOfBottles != 1 ? (pluralize = 's') : (pluralize = '');
    numOfBottles != 0 ? (nobText = numOfBottles) : (nobText = 'No more');
    console.log(`${nobText} bottle${pluralize} of beer on the wall, ${nobText.toString().toLowerCase()} bottle${pluralize} of beer.`);
    if (numOfBottles > 0) {
      numOfBottles--;
      numOfBottles != 1 ? (pluralize = 's') : (pluralize = '');
      numOfBottles != 0 ? (nobText = numOfBottles) : (nobText = 'no more');
      console.log(`Take one down and pass it around, ${nobText} bottle${pluralize} of beer on the wall.`);
    } else {
      numOfBottles = 99;
      console.log(`Go to the store and buy some more, ${numOfBottles} bottles of beer on the wall.`);
      numOfBottles = -1;
    }
  }
}
sing99Bottles();
