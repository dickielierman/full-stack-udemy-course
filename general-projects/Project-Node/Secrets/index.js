// Import required modules
import express from 'express';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import bodyParser from 'body-parser';

// Define the directory name using Node.js modules
const __dirname = dirname(fileURLToPath(import.meta.url));

// Create an Express application and set the port
const app = express();
const port = 3000;

// Variable to track user authorization status
let userAuthorized = false;

// Use bodyParser middleware to parse URL-encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));

// Middleware function to check the entered password
function checkPassword(req, res, next) {
  // Extract the entered password from the request body
  const enteredPw = req.body.password;

  // Check if the entered password is correct
  if (enteredPw === 'ILoveProgramming') {
    // Set userAuthorized to true if the password is correct
    userAuthorized = true;
  }

  // Continue to the next middleware or route handler
  next();
}

// Use the checkPassword middleware for all routes
app.use(checkPassword);

// Route to handle the home page
app.get('/', (req, res) => {
  // Send the index.html file as a response
  res.sendFile(__dirname + '/public/index.html');
});

// Route to check the entered password and redirect accordingly
app.post('/check', (req, res) => {
  // Extract the entered password from the request body
  const enteredPw = req.body.password;

  // Check if the user is authorized based on the password
  if (userAuthorized) {
    // Send the secret.html file as a response if authorized
    res.sendFile(__dirname + '/public/secret.html');
  } else {
    // Redirect to the home page if not authorized
    res.redirect('/');
  }
});

// Start the Express server
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
