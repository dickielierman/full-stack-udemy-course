import express from 'express';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import bodyParser from 'body-parser';

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const port = 3000;

let userAuthorized = false;

app.use(bodyParser.urlencoded({ extended: true }));

function checkPassword(req, res, next) {
  const enteredPw = req.body.password;
  if (enteredPw === 'ILoveProgramming') {
    userAuthorized = true;
  }
  next();
}
app.use(checkPassword);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

app.post('/check', (req, res) => {
  const enteredPw = req.body.password;
  if (userAuthorized) {
    res.sendFile(__dirname + '/public/secret.html');
  } else {
    res.redirect('/');
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
