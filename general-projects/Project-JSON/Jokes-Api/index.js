import express from 'express';
import bodyParser from 'body-parser';
import { JokeDatabase, newJoke } from './database/jdb.js';

const app = express();
const port = 3000;
const masterKey = '4VGP2DN-6EWM4SJ-N6FGRHV-Z3PR3TT';

app.use(bodyParser.urlencoded({ extended: true }));

//1. GET a random joke
app.get('/random/', async (req, res, next) => {
  try {
    const randomJoke = await JokeDatabase.getRandomJoke();
    res.send(randomJoke);
  } catch (error) {
    next(error); // Pass the error to the next middleware
  }
});

//2. GET a specific joke
app.get('/jokes/:id', async (req, res, next) => {
  try {
    const jokeId = Number(req.params.id);
    const specificJoke = await JokeDatabase.getJokeById(jokeId);
    res.send(specificJoke);
  } catch (error) {
    next(error);
  }
});

//3. GET a jokes by filtering on the joke type
app.get('/filter', (req, res) => {
  const type = req.query.type;
  const filteredJokes = JokeDatabase.getFilteredJokes(type);
  res.send(filteredJokes);
});

//4. POST a new joke
app.post('/jokes', (req, res) => {
  const text = req.body.text;
  const type = req.body.type;
  const joke = new newJoke(text, type);
  console.log(joke);
  res.send(joke);
});
//5. PUT a joke
app.put('/jokes/:id', (req, res) => {
  const id = Number(req.params.id);
  const text = req.body.text;
  const type = req.body.type;
  const replacedJoke = JokeDatabase.replaceJoke(id, text, type);
  res.send(replacedJoke);
});
//6. PATCH a joke
app.patch('/jokes/:id', (req, res) => {
  const id = Number(req.params.id);
  const jokeData = {};
  req.body.text ? (jokeData.jokeText = req.body.text) : '';
  req.body.type ? (jokeData.jokeType = req.body.type) : '';
  const replacedJoke = JokeDatabase.patchJoke(id, jokeData);
  res.send(replacedJoke);
});
//8. DELETE All jokes
app.delete('/jokes/all', (req, res) => {
  const userKey = req.query.key;
  if (userKey === masterKey) {
    JokeDatabase.deleteAllJokes();
    res.sendStatus(200);
  } else {
    res.status(404).json({ error: 'You are not authorised to perform this action' });
  }
});
//7. DELETE Specific joke
app.delete('/jokes/:id', (req, res) => {
  const id = Number(req.params.id);
  const result = JokeDatabase.deleteJoke(id);
  if (result === 'Success') {
    res.sendStatus(200);
  } else {
    res.status(404).json({ error: 'Joke not found.' });
  }
});

app.get('*', function (req, res) {
  res.status(404).send('It seems our adventure has come to an untimely end.');
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

app.listen(port, () => {
  console.log(`Successfully started server on port ${port}.`);
});
