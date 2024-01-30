// Array of colors that can be pressed by the user
var buttonColors = ['red', 'blue', 'green', 'yellow'];
// Array to store the randomly generated pattern by the game
var gamePattern = [];
// Current level of the game
var level = 0;
// Flag to track if the game has started
var started = false;
// Array to store the colors clicked by the user in the current round
var userClickedPattern = [];

// Function to generate the next color sequence in the game
function nextSequence() {
  // Reset the user's pattern for the current round
  userClickedPattern = [];
  // Increment the level for the next round
  level++;
  // Update the displayed level in the title
  $('#level-title').text(`Level ${level}`);
  // Generate a random number to select a color from the array
  var randomNumber = Math.floor(Math.random() * 4);
  // Select a random color from the array
  var randomChosenColor = buttonColors[randomNumber];
  // Add the randomly chosen color to the game pattern
  gamePattern.push(randomChosenColor);
  // Show the selected color's animation to the user
  $(`#${randomChosenColor}`).fadeIn(100).fadeOut(100).fadeIn(100);
  // Play the corresponding audio for the selected color
  playAudio(randomChosenColor);
}

// Function to play audio for a given color
function playAudio(name) {
  var audio = new Audio(`./sounds/${name}.mp3`);
  audio.play();
}

// Function to animate the button press effect for a given color
function animatePress(currentColor) {
  $(`#${currentColor}`).addClass('pressed');
  setTimeout(() => {
    $(`#${currentColor}`).removeClass('pressed');
  }, 100);
}

// Function to check the user's answer against the game pattern
function checkAnswer(currentLevel) {
  // Check if the user's selected color matches the game pattern
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    // Check if the user has completed the entire pattern for this level
    if (userClickedPattern.length === gamePattern.length) {
      // Delay before moving on to the next sequence
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    // Play the 'wrong' audio and provide visual feedback for a wrong answer
    playAudio('wrong');
    $('body').addClass('game-over');
    setTimeout(function () {
      $('body').removeClass('game-over');
    }, 200);
    // Update the title to indicate game over
    $('#level-title').text('Game Over, Press Any Key to Restart');
    // Reset game variables
    startOver();
  }
}

// Function to reset game variables
function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}

// Event listener for button clicks
$('.btn').on('click', function (e) {
  // Get the ID of the clicked button (color)
  userPick = e.target.id;
  // Add the selected color to the user's pattern
  userClickedPattern.push(userPick);
  // Play the audio for the selected color
  playAudio(userPick);
  // Animate the button press effect
  animatePress(userPick);
  // Check the user's answer against the game pattern
  checkAnswer(userClickedPattern.length - 1);
});

// Event listener for keypress (to start the game)
$(document).keypress(function (e) {
  // Check if the game has not started yet
  if (!started) {
    // Set the started flag to true
    started = true;
    // Update the displayed level in the title
    $('#level-title').text(`Level ${level}`);
    // Start the game by generating the first sequence
    nextSequence();
  }
});
