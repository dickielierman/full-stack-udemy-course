// Function to generate a random number between 1 and 100
function getRandomNumber() {
  const randomDecimal = Math.random();
  return Math.floor(randomDecimal * 100) + 1;
}

// Prompt for the user to input information about their significant other
const sigOther = prompt('I need the tea. Who are you seeing these days?');
prompt('Are they good with dogs?');
prompt('Any weird hobbies?');

// Generate a random chance percentage
const chance = getRandomNumber();

// Display different messages based on the chance
if (chance > 80) {
  alert("Well, you and ol' " + sigOther + ' have a ' + chance + "% chance of gettin' hitched!");
} else if (50 < chance && chance < 79) {
  alert("Well, guess I can see that. You and ol' " + sigOther + ' have a ' + chance + '% chance of working through things!');
} else {
  alert("I don't know, you and ol' " + sigOther + ' have a ' + chance + "% chance of working out, so odds ain't good...");
}
