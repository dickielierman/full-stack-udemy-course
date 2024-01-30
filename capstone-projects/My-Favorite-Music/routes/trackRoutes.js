// Importing necessary modules
import express from 'express';
import * as myDb from '../db/db.js';
import AxiosClient from './../utils/myAxios.js';

// Creating a router for handling track-related routes
const router = express.Router();
const deezer = new AxiosClient(process.env.DEEZER_BASE);

// Route: POST /
// Summary: Handles adding or deleting a track based on the request parameters
router.post('/', async (req, res) => {
  // Extracting parameters from the request body
  const source = req.body.source;
  const track = Number(req.body.track);

  // Checking if the action is to delete the track
  if (req.body.action && req.body.action === 'delete') {
    try {
      // Deleting the track from the database
      await myDb.deleteTrack(track);
    } catch (err) {
      console.log(err.message);
    }
    // Redirecting to the specified source
    res.redirect(source);
  } else {
    // Fetching track data from Deezer
    const data = await deezer.get(`/track/${track}`);
    try {
      // Adding the track to the database
      await myDb.addTrack(data);
    } catch (err) {
      console.log(err.message);
    }
    // Redirecting to the specified source
    res.redirect(source);
  }
});

// Exporting the router
export default router;
