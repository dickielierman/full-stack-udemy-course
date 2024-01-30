// Import the Express library
import express from 'express';

// Create an Express application
const app = express();
const port = 3000;

// Serve static files from the 'public' directory
app.use(express.static('public'));

// Route to handle the home page (GET request)
app.get('/', (req, res) => {
  // Render the 'index.ejs' template
  res.render('index.ejs');
});

// Route to handle the 'about' page (GET request)
app.get('/about', (req, res) => {
  // Render the 'about.ejs' template
  res.render('about.ejs');
});

// Route to handle the 'contact' page (GET request)
app.get('/contact', (req, res) => {
  // Render the 'contact.ejs' template
  res.render('contact.ejs');
});

// Start the Express server and listen on the specified port
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
