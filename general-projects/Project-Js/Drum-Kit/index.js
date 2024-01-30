// Event listener for keydown events
document.addEventListener('keydown', function (event) {
  // Call buttonActions function with the pressed key
  buttonActions(event.key);
});

// Event listeners for each drum element
document.querySelectorAll('.drum').forEach((elem) => {
  elem.addEventListener('click', function () {
    // Call buttonActions function with the innerHTML of the clicked drum element
    buttonActions(this.innerHTML);
  });
});

// Function to play a sound based on the provided key
function makeSound(val) {
  switch (val) {
    case 'w':
      playFile('tom-1');
      break;
    case 'a':
      playFile('tom-2');
      break;
    case 's':
      playFile('tom-3');
      break;
    case 'd':
      playFile('tom-4');
      break;
    case 'j':
      playFile('snare');
      break;
    case 'k':
      playFile('crash');
      break;
    case 'l':
      playFile('kick-bass');
      break;
    default:
      console.log(val + ' was pressed.');
      break;
  }
}

// Function to play an audio file based on the provided name
function playFile(name) {
  var audio = new Audio(`./sounds/${name}.mp3`);
  audio.play();
}

// Function to animate the pressed button
function buttonAnimation(currentKey) {
  var activeBtn = document.querySelector(`.${currentKey}`);
  // Add 'pressed' class to the active button
  activeBtn.classList.add('pressed');
  // Remove 'pressed' class after 100 milliseconds
  setTimeout(function () {
    activeBtn.classList.remove('pressed');
  }, 100);
}

// Function to handle both sound generation and button animation
function buttonActions(val) {
  makeSound(val);
  buttonAnimation(val);
}
