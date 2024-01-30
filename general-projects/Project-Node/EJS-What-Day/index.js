// Import required modules
import express from 'express';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import bodyParser from 'body-parser';

// Resolve the current directory
const __dirname = dirname(fileURLToPath(import.meta.url));

// Create an Express application
const app = express();
const port = 3000;

// Set up middleware to parse URL-encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));

// Route to handle the home page (GET request)
app.get('/', (req, res) => {
  // Get the current day of the week
  const day = new Date().getDay();

  // Determine whether it's a weekday or the weekend and provide corresponding information
  const dayInfo = day > 0 && day < 6 ? { dayType: 'a weekday', toDo: 'work hard' } : { dayType: 'the weekend', toDo: 'have fun' };

  // Render the 'index.ejs' template with the day information
  res.render('index.ejs', dayInfo);
});

// Start the Express server and listen on the specified port
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
