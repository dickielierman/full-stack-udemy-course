import { db } from './db.js';
// Function to get all artists from the database
async function getAllArtists() {
  const result = await db.query('SELECT * FROM artists');
  return result.rows;
}

// Function to get all artists by their Genre ID
async function getAllArtistsByGenre(dezzerId) {
  const result = await db.query('SELECT * FROM artists WHERE genre_id = $1', [dezzerId]);
  return result.rows;
}

// Function to get an artist by their Deezer ID
async function getArtistByDeezerId(deezerId) {
  const result = await db.query('SELECT * FROM artists WHERE deezer_id = $1', [deezerId]);
  try {
    return result.rows[0];
  } catch {
    return false;
  }
}

// Function to add a new artist to the database
async function addArtist(deezerId, name, link, share, picture, pictureSmall, pictureMedium, pictureBig, pictureXL, nbAlbum, nbFan, radio, tracklist, type, genreID) {
  const result = await db.query(
    'INSERT INTO artists(deezer_id, name, link, share, picture, picture_small, picture_medium, picture_big, picture_xl, nb_album, nb_fan, radio, tracklist, type, genre_id) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15) RETURNING *',
    [deezerId, name, link, share, picture, pictureSmall, pictureMedium, pictureBig, pictureXL, nbAlbum, nbFan, radio, tracklist, type, genreID]
  );
  return result.rows[0];
}

// Function to delete an artist from the database
async function deleteArtist(deezerId) {
  const result = await db.query('DELETE FROM artists WHERE deezer_id = $1 RETURNING *', [deezerId]);
  return result.rows[0];
}

export { getAllArtists, getAllArtistsByGenre, getArtistByDeezerId, addArtist, deleteArtist };
