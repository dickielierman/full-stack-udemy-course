// Import the express module
import express from 'express';

// Create an Express application
const app = express();

// Set the port for the server to run on
const port = 3000;

// Middleware function to log request information
function logger(req, res, next) {
  // Log the request method and URL to the console
  console.log('Request method: ', req.method);
  console.log('Request URL: ', req.url);

  // Call the next middleware in the stack
  next();
}

// Use the logger middleware for all routes
app.use(logger);

// Define a route for the home page (GET request)
app.get('/', (req, res) => {
  // Send the response 'Hello' when a GET request is made to the home page
  res.send('Hello');
});

// Start the Express server and listen on the specified port
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
