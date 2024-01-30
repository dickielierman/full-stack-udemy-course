// Import the Express library
import express from 'express';

// Create an Express application
const app = express();
const port = 3000;

// Route to handle the home page (GET request)
app.get('/', (req, res) => {
  // Data to be passed to the EJS template
  const data = {
    title: 'EJS Tags',
    seconds: new Date().getSeconds(),
    items: ['apple', 'banana', 'cherry'],
    htmlContent: '<strong>This is some strong text</strong>',
  };

  // Render the 'index.ejs' template with the provided data
  res.render('index.ejs', data);
});

// Start the Express server and listen on the specified port
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
