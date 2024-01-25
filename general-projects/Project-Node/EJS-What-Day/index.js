import express from 'express';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import bodyParser from 'body-parser';

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  const day = new Date().getDay();
  const dayInfo = day > 0 && day < 6 ? { dayType: 'a weekday', toDo: 'work hard' } : { dayType: 'the weekend', toDo: 'have fun' };
  res.render('index.ejs', dayInfo);
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
