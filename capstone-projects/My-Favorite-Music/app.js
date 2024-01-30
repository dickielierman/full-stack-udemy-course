// Import necessary modules
import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import routes from './routes/index.js';

// Load environment variables from .env file
dotenv.config();

// Create an Express application
const app = express();
const port = process.env.APP_PORT || 3000; // Use a default port if APP_PORT is not set

// Middleware to parse URL-encoded data and serve static files
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// Use the defined routes for handling requests
app.use('/', routes);

// Handle 404 errors
app.get('*', function (req, res) {
  res.status(404).send('It seems our adventure has come to an untimely end.'); // Removed the second parameter (status) as it is not needed
});

// Start the server and listen on the specified port
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
