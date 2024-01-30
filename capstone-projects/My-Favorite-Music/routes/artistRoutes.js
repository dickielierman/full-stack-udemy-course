// Importing necessary modules
import express from 'express';
import querystring from 'querystring';
const router = express.Router();
import * as myDb from '../db/db.js'; // Importing database functions
import AxiosClient from './../utils/myAxios.js';
const deezer = new AxiosClient(process.env.DEEZER_BASE);

// Route: GET /artist/:id
// Summary: Handles GET request for viewing artist details, including albums and favorites
router.get('/:id', async (req, res) => {
  // Extracting Deezer artist ID and index from request parameters and query string
  const deezerArtistId = Number(req.params.id);
  const index = req.query.index || 0;
  const getAlbumsQuery = `/artist/${deezerArtistId}/albums?index=${index}&limit=7`;

  // Fetching artist data from the local database or Deezer API
  const artistData = (await myDb.getArtistByDeezerId(deezerArtistId)) || (await deezer.get(`/artist/${deezerArtistId}`));

  // Fetching artist albums from the Deezer API
  const artistAlbums = await deezer.get(getAlbumsQuery);

  // Fetching favorite albums associated with the artist
  const favAlbums = await myDb.getAlbumsByArtistId(deezerArtistId);

  // Rendering the artist details page
  res.render('artist.ejs', { artistData: artistData, artistAlbums: artistAlbums, myIndex: index, favAlbums: favAlbums });
});

// Route: POST /artist/:id
// Summary: Handles POST request for updating the artist details page with new album index
router.post('/:id', async (req, res) => {
  // Extracting Deezer artist ID and index from request parameters and form data
  const deezerArtistId = Number(req.params.id);
  const index = querystring.parse(req.body.albumListData).index || 0;
  const getAlbumsQuery = req.body.albumListData.replace(process.env.DEEZER_BASE, '');

  // Fetching artist data from the local database or Deezer API
  const artistData = (await myDb.getArtistByDeezerId(deezerArtistId)) || (await deezer.get(`/artist/${deezerArtistId}`));

  // Fetching artist albums from the Deezer API
  const artistAlbums = await deezer.get(getAlbumsQuery);

  // Fetching favorite albums associated with the artist
  const favAlbums = await myDb.getAlbumsByArtistId(deezerArtistId);

  // Rendering the updated artist details page
  res.render('artist.ejs', { artistData: artistData, artistAlbums: artistAlbums, myIndex: index, favAlbums: favAlbums });
});

// Route: POST /artist
// Summary: Handles POST request for adding or removing an artist
router.post('/', async (req, res) => {
  // Extracting form data from the request body
  const artistId = Number(req.body.artist);
  const source = req.body.source;
  const genre = Number(req.body.genre);

  // Checking if the action is to remove the artist
  if (req.body.action && req.body.action === 'remove') {
    await myDb.deleteArtist(artistId);
    res.redirect(source);
  } else {
    // Fetching artist data from the Deezer API
    const d = await deezer.get(`/artist/${artistId}`);

    try {
      // Adding the artist to the database
      await myDb.addArtist(
        d.id,
        d.name,
        d.link,
        d.share,
        d.picture,
        d.picture_small,
        d.picture_medium,
        d.picture_big,
        d.picture_xl,
        d.nb_album,
        d.nb_fan,
        d.radio,
        d.tracklist,
        d.type,
        genre
      );
    } catch (err) {
      console.log(err);
    }

    // Redirecting to the source URL
    res.redirect(source);
  }
});

// Exporting the router
export default router;
