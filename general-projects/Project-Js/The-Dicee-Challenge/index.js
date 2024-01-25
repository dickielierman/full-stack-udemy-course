function roleDie() {
  return Math.floor(Math.random() * 6) + 1;
}
function setDie(player, res) {
  document.querySelector(`.img${player}`).setAttribute('src', `./images/dice${res}.png`);
}
function setH1(val) {
  document.querySelector('h1').innerText = val;
}
function checkWinner(player1, player2) {
  if (player1 > player2) {
    setH1('🚩 Player 1 Wins!');
  } else if (player2 > player1) {
    setH1('Player 2 Wins! 🚩');
  } else {
    setH1('Draw! 🚩');
  }
}
var randomNumber1 = roleDie();
var randomNumber2 = roleDie();
setDie(1, randomNumber1);
setDie(2, randomNumber2);
checkWinner(randomNumber1, randomNumber2);
