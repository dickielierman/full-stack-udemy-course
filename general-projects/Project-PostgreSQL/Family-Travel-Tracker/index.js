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

// Initialize a variable to keep track of the current user ID
let currentUserId = 1;

// Set up middleware to parse URL-encoded bodies and serve static files
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// Function to retrieve all users from the database
async function getUsers() {
  try {
    const result = await db.query('SELECT * FROM users');
    return result.rows;
  } catch (err) {
    // Handle database query error
    console.error(err);
  }
}

// Retrieve users and store them in a variable
let users = await getUsers();

// Function to get the current user based on the currentUserId
async function getCurrentUser() {
  const users = await getUsers();
  const user = users.find((user) => user.id == currentUserId);
  return user;
}

// Function to check which countries the current user has visited
async function checkVisited() {
  const result = await db.query('SELECT country_code FROM visited_countries WHERE user_id = $1', [currentUserId]);
  let countries = [];
  result.rows.forEach((country) => {
    countries.push(country.country_code);
  });
  return countries;
}

// Function to check if a specific country has been visited by the current user
async function checkPreviousVisit(code) {
  const visited = await checkVisited();
  return visited.includes(code);
}

// Route to handle the home page
app.get('/', async (req, res) => {
  // Retrieve visited countries, current user, and render the index page
  const countries = await checkVisited();
  const currentUser = await getCurrentUser();

  res.render('index.ejs', {
    countries: countries,
    total: countries.length,
    users: users,
    color: currentUser.color,
  });
});

// Route to handle the addition of a new visited country
app.post('/add', async (req, res) => {
  const country = req.body.country;
  const currentUser = await getCurrentUser();
  currentUserId = currentUser.id;
  try {
    // Query the country code based on the provided country name
    const result = await db.query("SELECT country_code FROM countries WHERE LOWER(country_name) LIKE '%' || $1 || '%';", [country.toLowerCase()]);
    const countryCode = result.rows[0].country_code;

    try {
      // Insert the visited country record into the database
      await db.query('INSERT INTO visited_countries (country_code, user_id) VALUES ($1, $2)', [countryCode, currentUserId]);
      res.redirect('/');
    } catch (err) {
      // Handle case where the country has already been visited
      const countries = await checkVisited();
      res.render('index.ejs', {
        total: countries.length,
        countries: countries,
        users: users,
        color: currentUser.color,
        error: 'Country has already been visited, try again.',
      });
    }
  } catch (err) {
    // Handle errors related to the database query
    const countries = await checkVisited();
    res.render('index.ejs', {
      total: countries.length,
      countries: countries,
      users: users,
      color: currentUser.color,
      error: 'Country name does not exist, try again.',
    });
  }
});

// Route to handle user-related actions
app.post('/user', async (req, res) => {
  if (req.body.add === 'new') {
    // Render the page to add a new user
    res.render('new.ejs');
  } else {
    // Set the currentUserId based on the selected user and render the index page
    currentUserId = Number(req.body.user);
    const currentUser = await getCurrentUser();
    const countries = await checkVisited();
    res.render('index.ejs', {
      countries: countries,
      total: countries.length,
      users: users,
      color: currentUser.color,
    });
  }
});

// Route to handle the addition of a new user
app.post('/new', async (req, res) => {
  if (req.body.name.trim() === '' || !req.body.color) {
    // Render the new.ejs page with an error message if required data is missing
    const errorTxt = req.body.name.trim() === '' && !req.body.color ? 'Name & Color' : !req.body.color ? 'Color' : 'Name';
    res.render('new.ejs', { error: `You are missing (${errorTxt}) data` });
  } else {
    // Insert the new user into the database and update the users variable
    const name = req.body.name;
    const color = req.body.color;
    try {
      const result = await db.query('INSERT INTO users (name, color) VALUES ($1, $2) RETURNING *', [name, color]);
      currentUserId = result.rows[0].id;
      users = await getUsers();
      res.redirect('/');
    } catch (err) {
      // Handle errors related to the database query
      console.error(err);
    }
  }
});

// Start the Express server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
