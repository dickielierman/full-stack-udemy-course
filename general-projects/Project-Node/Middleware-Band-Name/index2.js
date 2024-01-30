// Import necessary modules
import express from 'express';
import morgan from 'morgan';

// Create an Express application
const app = express();

// Set the port for the server to run on
const port = 3000;

// Use morgan middleware for logging HTTP requests (tiny format)
app.use(morgan('tiny'));

// Define a route for the home page (GET request)
app.get('/', (req, res) => {
  // Send the response 'Hello' when a GET request is made to the home page
  res.send('Hello');
});

// Start the Express server and listen on the specified port
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
