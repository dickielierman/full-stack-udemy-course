document.addEventListener('keydown', function (event) {
  buttonActions(event.key);
});
document.querySelectorAll('.drum').forEach((elem) => {
  elem.addEventListener('click', function () {
    buttonActions(this.innerHTML);
  });
});
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
      console.log(buttonInnerHTML + ' was clicked.');
      break;
  }
}
function playFile(name) {
  var audio = new Audio(`./sounds/${name}.mp3`);
  audio.play();
}
function buttonAnimation(currentKey) {
  var activeBtn = document.querySelector(`.${currentKey}`);
  activeBtn.classList.add('pressed');
  setTimeout(function () {
    activeBtn.classList.remove('pressed');
  }, 100);
}
function buttonActions(val) {
  makeSound(val);
  buttonAnimation(val);
}
