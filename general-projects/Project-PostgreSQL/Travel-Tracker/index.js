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

// Function to check which countries have been visited
async function checkVisited() {
  // Query the visited_countries table to get a list of visited country codes
  const result = await db.query('SELECT country_code FROM visited_countries');
  const countries = [];

  // Extract country codes from the query result and store them in the countries array
  result.rows.forEach((country) => {
    countries.push(country.country_code);
  });

  return countries;
}

// Set up middleware to parse URL-encoded bodies and serve static files
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// Route to handle the home page
app.get('/', async (req, res) => {
  // Retrieve the list of visited countries and render the index page
  const countries = await checkVisited();
  console.log(countries);
  res.render('index.ejs', { total: countries.length, countries: countries });
});

// Route to handle the addition of a new visited country
app.post('/add', async (req, res) => {
  const country = req.body.country;
  try {
    // Query the country code based on the provided country name
    const result = await db.query(`SELECT country_code FROM countries WHERE LOWER(country_name) LIKE '%' || $1 || '%'`, [country.toLowerCase()]);
    const countryCode = result.rows[0].country_code;

    try {
      // Insert the visited country record into the visited_countries table
      await db.query(`INSERT INTO visited_countries (country_code) VALUES ($1)`, [countryCode]);
      res.redirect('/');
    } catch (err) {
      // Handle existing record error
      const countries = await checkVisited();
      res.render('index.ejs', {
        total: countries.length,
        countries: countries,
        error: 'Country has already been visited, try again.',
      });
    }
  } catch (err) {
    // Handle no results error
    const countries = await checkVisited();
    res.render('index.ejs', {
      total: countries.length,
      countries: countries,
      error: 'Country name does not exist, try again.',
    });
  }
});

// Start the Express server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
