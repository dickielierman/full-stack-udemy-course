// Import necessary modules
import express from 'express';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import bodyParser from 'body-parser';

// Get the current directory using Node.js __dirname
const __dirname = dirname(fileURLToPath(import.meta.url));

// Create an Express application
const app = express();

// Set the port for the server to run on
const port = 3000;

// Use bodyParser middleware to parse URL-encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));

// Define a route for the home page (GET request)
app.get('/', (req, res) => {
  // Send the index.html file as a response
  res.sendFile(__dirname + '/public/index.html');
});

// Define a route for handling form submissions (POST request)
app.post('/submit', (req, res) => {
  // Log the body of the POST request (form data)
  console.log(req.body);
  // Send a response to the client
  res.send('Form submitted successfully!');
});

// Start the Express server and listen on the specified port
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
