// Importing necessary modules
import express from 'express';
import * as myDb from '../db/db.js';

// Importing other routers
import genreRoutes from './genreRoutes.js';
import artistRoutes from './artistRoutes.js';
import albumRoutes from './albumRoutes.js';
import trackRoutes from './trackRoutes.js';

// Creating the main router for the application
const router = express.Router();

// Route: GET /
// Summary: Handles the home page request, fetching all genres and rendering the 'index.ejs' file
router.get('/', async (req, res) => {
  // Fetching all genres from the database
  const data = await myDb.getAllGenres();

  // Rendering the 'index.ejs' file and passing the genre data
  res.render('index.ejs', { genres: data });
});

// Route: /genre, /artist, /album, /track
// Summary: Forwards requests to the respective routers
router.use('/genre', genreRoutes);
router.use('/artist', artistRoutes);
router.use('/album', albumRoutes);
router.use('/track', trackRoutes);

// Exporting the main router
export default router;
