function getRandomNumber() {
  const randomDecimal = Math.random();
  return Math.floor(randomDecimal * 100) + 1;
}
const sigOther = prompt('I need the tea. Who are you seeing these days?');
prompt('Are they good with dogs?');
prompt('Any weird hobbies?');
const chance = getRandomNumber();
if (chance > 80) {
  alert("Well, you and ol' " + sigOther + ' have a ' + chance + "% chance of gettin' hitched!");
} else if (50 < chance && chance < 79) {
  alert("Well, guess I can see that. You and ol' " + sigOther + ' have a ' + chance + '% chance of working through things!');
} else {
  alert("I don't know, you and ol' " + sigOther + ' have a ' + chance + "% chance of working out, so odds ain't good...");
}
