var output = [];
function fizzBuzz() {
  thisIteration = output.length + 1;
  if (thisIteration % 3 === 0 && thisIteration % 5 === 0) {
    output.push('FizzBuzz');
  } else if (thisIteration % 3 === 0) {
    output.push('Fizz');
  } else if (thisIteration % 5 === 0) {
    output.push('Buzz');
  } else {
    output.push(thisIteration);
  }
}

for (let i = 0; i <= 20; i++) {
  fizzBuzz();
}
console.log(output);
