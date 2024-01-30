// Import the Express module
import express from 'express';

// Create an Express application
const app = express();

// Set the port for the server to run on
const port = 3000;

// Define a route for the home page (GET request)
app.get('/', (req, res) => {
  // Send a simple HTML response to the client
  res.send("<h1>Hey there, Dickie! You're on your home page.</h1>");
});

// Define a route for user registration (POST request)
app.post('/register', (req, res) => {
  // Send a status code 201 (Created) in response to a successful registration
  res.sendStatus(201);
});

// Define a route for updating a specific user (PUT request)
app.put('/user/dickie', (req, res) => {
  // Send a status code 200 (OK) in response to a successful update
  res.sendStatus(200);
});

// Define a route for partially updating a specific user (PATCH request)
app.patch('/user/dickie', (req, res) => {
  // Send a status code 200 (OK) in response to a successful partial update
  res.sendStatus(200);
});

// Define a route for deleting a specific user (DELETE request)
app.delete('/user/dickie', (req, res) => {
  // Send a status code 200 (OK) in response to a successful deletion
  res.sendStatus(200);
});

// Start the Express server and listen on the specified port
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
