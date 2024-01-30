// Import required modules
import express from 'express';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import bodyParser from 'body-parser';

// Get the current directory name using Node.js __dirname equivalent
const __dirname = dirname(fileURLToPath(import.meta.url));

// Create an Express application
const app = express();

// Set the port for the server to run on
const port = 3000;

// Use bodyParser middleware to parse URL-encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));

// Define a route for the home page (GET request)
app.get('/', (req, res) => {
  // Send the 'index.html' file as a response
  res.sendFile(__dirname + '/public/index.html');
});

// Define a route for form submission (POST request)
app.post('/submit', (req, res) => {
  // Concatenate 'street' and 'pet' from the request body to form the band name
  const bandName = req.body.street + req.body.pet;

  // Send a response containing the band name in HTML format
  res.send(`<h1>Your band name is</h1><h2>${bandName}</h2>`);
});

// Start the Express server and listen on the specified port
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
