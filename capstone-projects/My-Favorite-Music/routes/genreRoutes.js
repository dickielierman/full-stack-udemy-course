// Importing necessary modules
import express from 'express';
const router = express.Router();
import * as myDb from '../db/db.js';
import AxiosClient from './../utils/myAxios.js';
const deezer = new AxiosClient(process.env.DEEZER_BASE);

// Function: cleanArray
// Summary: Removes items from listTwo that have the same "id" as items in listOne
function cleanArray(listOne, listTwo) {
  const deezerIdsSet = new Set(listOne.map((item) => item.deezer_id));
  const cleanedListTwo = listTwo.filter((item) => !deezerIdsSet.has(item.id));
  return cleanedListTwo;
}

// Route: GET /genre/:id
// Summary: Handles GET request for viewing artists in a specific genre
router.get('/:id', async (req, res) => {
  // Extracting genre ID from request parameters
  const genreId = Number(req.params.id);

  // Fetching favorite artists associated with the genre
  const favData = await myDb.getAllArtistsByGenre(genreId);

  // Fetching artist data from the Deezer API for the specified genre
  const data = await deezer.get(`/genre/${genreId}/artists`);

  // Cleaning the Deezer data by removing items that are already favorites
  const cleanedData = cleanArray(favData, data.data);

  // Fetching information about the genre
  const genreInfo = await myDb.getGenreById(genreId);

  // Rendering the genre details page
  res.render('genre.ejs', { data: cleanedData, genre: genreInfo, favData: favData });
});

// Route: GET /genre/feed
// Summary: Handles GET request for fetching and updating genre data from Deezer
router.get('/feed', async (req, res) => {
  // Fetching genre data from the Deezer API
  const data = await deezer.get('/genre');

  // Checking if the fetched data is not empty
  if (data.data.length > 0) {
    const d = data.data;

    // Iterating through the fetched genre data and adding it to the local database
    d.forEach(async (g) => {
      try {
        await myDb.addGenre(g.id, g.name, g.picture, g.picture_small, g.picture_medium, g.picture_big, g.picture_xl, g.type);
      } catch (err) {
        console.log(err.message);
      }
    });
  }

  // Redirecting to the home page
  res.redirect('/');
});

// Exporting the router
export default router;
