// Importing necessary modules
import express from 'express';
const router = express.Router();
import * as myDb from '../db/db.js'; // Importing database functions
import * as myTime from '../utils/timeUtils.js'; // Importing utility functions
import AxiosClient from './../utils/myAxios.js';

// Creating an AxiosClient instance for Deezer API requests
const deezer = new AxiosClient(process.env.DEEZER_BASE);

// Route: GET /album/:id
// Summary: Handles GET request for viewing album details
router.get('/:id', async (req, res) => {
  // Extracting Deezer album ID from the request parameters
  const deezerAlbumId = Number(req.params.id);

  // Building the Deezer API query for fetching album details
  const getAlbumQuery = `/album/${deezerAlbumId}`;

  // Fetching album data from the local database or Deezer API
  const albumData = (await myDb.getAlbumById(deezerAlbumId)) || (await deezer.get(getAlbumQuery));

  // Fetching favorite tracks associated with the album artist
  const favTracks = await myDb.getTracksByArtistId(albumData.artist.id);

  // Fetching tracks data from the Deezer API
  const trackData = await deezer.get(getAlbumQuery + '/tracks');
  const albumDataFiltered = myTime.convertDurations(albumData);
  const trackDataFiltered = myTime.convertDurations(trackData.data);

  // Rendering the album details page
  res.render('album.ejs', { albumData: albumDataFiltered, trackData: trackDataFiltered, favTracks: favTracks });
});

// Route: POST /album
// Summary: Handles POST request for adding or removing an album
router.post('/', async (req, res) => {
  // Extracting form data from the request body
  const source = req.body.source;
  const album = Number(req.body.album);

  // Checking if the action is to remove the album
  if (req.body.action && req.body.action === 'remove') {
    try {
      // Removing the album from the database
      await myDb.deleteAlbum(album);
    } catch (err) {
      console.log(err.message);
    }

    // Redirecting to the source URL
    res.redirect(source);
  } else {
    // Fetching album data from the Deezer API
    const d = await deezer.get(`/album/${album}`);

    try {
      // Adding the album to the database
      await myDb.addAlbum(d);
    } catch (err) {
      console.log(err.message);
    }

    // Redirecting to the source URL
    res.redirect(source);
  }
});

// Exporting the router
export default router;
