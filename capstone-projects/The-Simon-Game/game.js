var buttonColors = ['red', 'blue', 'green', 'yellow'];
var gamePattern = [];
var level = 0;
var started = false;
var userClickedPattern = [];

function nextSequence() {
  userClickedPattern = [];
  level++;
  $('#level-title').text(`Level ${level}`);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);
  $(`#${randomChosenColor}`).fadeIn(100).fadeOut(100).fadeIn(100);
  playAudio(randomChosenColor);
}

function playAudio(name) {
  var audio = new Audio(`./sounds/${name}.mp3`);
  audio.play();
}

function animatePress(currentColor) {
  $(`#${currentColor}`).addClass('pressed');
  setTimeout(() => {
    $(`#${currentColor}`).removeClass('pressed');
  }, 100);
}

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    playAudio('wrong');
    $('body').addClass('game-over');
    setTimeout(function () {
      $('body').removeClass('game-over');
    }, 200);
    $('#level-title').text('Game Over, Press Any Key to Restart');
    startOver();
  }
}

function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}

$('.btn').on('click', function (e) {
  userPick = e.target.id;
  userClickedPattern.push(userPick);
  playAudio(userPick);
  animatePress(userPick);
  checkAnswer(userClickedPattern.length - 1);
});

$(document).keypress(function (e) {
  if (!started) {
    started == true;
    $('#level-title').text(`Level ${level}`);
    nextSequence();
  }
});
