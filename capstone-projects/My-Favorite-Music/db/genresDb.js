import { db } from './db.js';
// Function to get all genres from the database
async function getAllGenres() {
  const result = await db.query('SELECT * FROM genres');
  return result.rows;
}

// Function to get a genre by its ID
async function getGenreById(genreId) {
  const result = await db.query('SELECT * FROM genres WHERE deezer_id = $1', [genreId]);
  return result.rows[0];
}

// Function to add a new genre to the database
async function addGenre(deezerId, name, picture, pictureSmall, pictureMedium, pictureBig, pictureXL, type) {
  const result = await db.query(
    'INSERT INTO genres(deezer_id, name, picture, picture_small, picture_medium, picture_big, picture_xl, type) VALUES($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *',
    [deezerId, name, picture, pictureSmall, pictureMedium, pictureBig, pictureXL, type]
  );
  return result.rows[0];
}

// Function to update a genre in the database
async function updateGenre(genreId, deezerId, name, picture, pictureSmall, pictureMedium, pictureBig, pictureXL, type) {
  const result = await db.query(
    'UPDATE genres SET name = $1, picture = $2, picture_small = $3, picture_medium = $4, picture_big = $5, picture_xl = $6, type = $7, deezer_id = $8 WHERE id = $9 RETURNING *',
    [name, picture, pictureSmall, pictureMedium, pictureBig, pictureXL, type, deezerId, genreId]
  );
  return result.rows[0];
}

// Function to delete a genre from the database
async function deleteGenre(genreId) {
  const result = await db.query('DELETE FROM genres WHERE id = $1 RETURNING *', [genreId]);
  return result.rows[0];
}

export { getAllGenres, getGenreById, addGenre, updateGenre, deleteGenre };
