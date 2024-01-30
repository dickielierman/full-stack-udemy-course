// Function to simulate rolling a six-sided die and return the result
function roleDie() {
  return Math.floor(Math.random() * 6) + 1;
}

// Function to set the image of the die for a specific player
function setDie(player, res) {
  // Select the image element with class img{player} and set its source attribute
  document.querySelector(`.img${player}`).setAttribute('src', `./images/dice${res}.png`);
}

// Function to set the text content of the h1 element
function setH1(val) {
  // Select the h1 element and set its text content to the provided value
  document.querySelector('h1').innerText = val;
}

// Function to check the winner or draw based on the results of both players
function checkWinner(player1, player2) {
  // Compare the results and update the h1 element with the winner or draw message
  if (player1 > player2) {
    setH1('🚩 Player 1 Wins!');
  } else if (player2 > player1) {
    setH1('Player 2 Wins! 🚩');
  } else {
    setH1('Draw! 🚩');
  }
}

// Simulate the game:
// Generate random numbers for Player 1 and Player 2
var randomNumber1 = roleDie();
var randomNumber2 = roleDie();

// Set the dice images for both players
setDie(1, randomNumber1);
setDie(2, randomNumber2);

// Check and display the winner or draw
checkWinner(randomNumber1, randomNumber2);
