import express from 'express';
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send("<h1>Hey there, Dickie! You're on your home page.</h1>");
});

app.post('/register', (req, res) => {
  res.sendStatus(201);
});

app.put('/user/dickie', (req, res) => {
  res.sendStatus(200);
});

app.patch('/user/dickie', (req, res) => {
  res.sendStatus(200);
});

app.delete('/user/dickie', (req, res) => {
  res.sendStatus(200);
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
