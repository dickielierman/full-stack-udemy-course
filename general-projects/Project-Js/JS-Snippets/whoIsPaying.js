function whosPaying(names) {
  /******Don't change the code above*******/
  const randomNum = Math.floor(Math.random() * names.length);
  return `${names[randomNum]} is going to buy lunch today!`;
  /******Don't change the code below*******/
}
console.log(whosPaying(['Angela', 'Ben', 'Jenny', 'Michael', 'Chloe']));
