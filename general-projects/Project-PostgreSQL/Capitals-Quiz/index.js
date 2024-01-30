// Import required libraries
import express from 'express';
import bodyParser from 'body-parser';
import pg from 'pg';

// Create an Express application
const app = express();
const port = 3000;

// Configure PostgreSQL database connection
const db = new pg.Client({
  user: 'postgres',
  host: 'localhost',
  database: 'world',
  password: '',
  port: 5432,
});

// Connect to the database
db.connect();

// Array to store quiz questions
let quiz = [];

// Query to retrieve quiz questions from the 'capitals' table in the database
db.query('SELECT * FROM capitals', (err, res) => {
  if (err) {
    console.error('Error executing query', err.stack);
  } else {
    // Store retrieved questions in the 'quiz' array
    quiz = res.rows;
  }
  // Close the database connection
  db.end();
});

// Variable to store the total number of correct answers
let totalCorrect = 0;

// Middleware to parse URL-encoded bodies and serve static files
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// Variable to store the current quiz question
let currentQuestion = {};

// Route to handle the home page (GET request)
app.get('/', async (req, res) => {
  // Reset the total correct count and get the next quiz question
  totalCorrect = 0;
  await nextQuestion();
  console.log(currentQuestion);
  // Render the 'index.ejs' template with the current question
  res.render('index.ejs', { question: currentQuestion });
});

// Route to handle the form submission (POST request)
app.post('/submit', (req, res) => {
  // Get the user's answer from the form
  let answer = req.body.answer.trim();
  let isCorrect = false;

  // Check if the answer is correct, update the total correct count, and get the next question
  if (currentQuestion.capital.toLowerCase() === answer.toLowerCase()) {
    totalCorrect++;
    console.log(totalCorrect);
    isCorrect = true;
  }

  nextQuestion();

  // Render the 'index.ejs' template with the new question and feedback
  res.render('index.ejs', {
    question: currentQuestion,
    wasCorrect: isCorrect,
    totalScore: totalCorrect,
  });
});

// Function to get the next random quiz question
async function nextQuestion() {
  const randomCountry = quiz[Math.floor(Math.random() * quiz.length)];

  // Set the current question to the randomly selected country
  currentQuestion = randomCountry;
}

// Start the Express server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
