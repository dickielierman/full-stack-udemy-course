import { db } from './db.js';

// Function to get all albums from the database
async function getAllAlbums() {
  const result = await db.query('SELECT * FROM albums');
  return result.rows;
}

// Function to get an album by its ID
async function getAlbumById(albumId) {
  const result = await db.query('SELECT * FROM albums WHERE deezer_id = $1', [albumId]);
  return result.rows[0];
}

// Function to add a new album to the database
async function addAlbum(d) {
  const result = await db.query(
    'INSERT INTO albums(deezer_id, title, upc, link, share, cover, cover_small, cover_medium, cover_big, cover_xl, md5_image, genre_id, genres, label, nb_tracks, duration, fans, release_date, record_type, available, tracklist, explicit_lyrics, explicit_content_lyrics, explicit_content_cover, contributors, artist, type, tracks) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24, $25, $26, $27, $28) RETURNING *',
    [
      d.id,
      d.title,
      d.upc,
      d.link,
      d.share,
      d.cover,
      d.cover_small,
      d.cover_medium,
      d.cover_big,
      d.cover_xl,
      d.md5_image,
      d.genre_id,
      JSON.stringify(d.genres),
      d.label,
      d.nb_tracks,
      d.duration,
      d.fans,
      d.release_date,
      d.record_type,
      d.available,
      d.tracklist,
      d.explicit_lyrics,
      d.explicit_content_lyrics,
      d.explicit_content_cover,
      JSON.stringify(d.contributors),
      JSON.stringify(d.artist),
      d.type,
      JSON.stringify(d.tracks),
    ]
  );
  return result.rows[0];
}

// Function to delete an album from the database
async function deleteAlbum(albumId) {
  const result = await db.query('DELETE FROM albums WHERE deezer_id = $1 RETURNING *', [albumId]);
  return result.rows[0];
}

// Function to get all albums by genre ID
async function getAlbumsByGenreId(genreId) {
  const result = await db.query('SELECT * FROM albums WHERE genre_id = $1', [genreId]);
  return result.rows;
}

// Function to get all albums by artist ID
async function getAlbumsByArtistId(artistId) {
  const result = await db.query(
    `SELECT * FROM albums WHERE (artist->>'id')::int = $1 
    OR EXISTS ( SELECT 1 FROM json_array_elements(contributors) AS contributor 
    WHERE (contributor->>'id')::int = $1)`,
    [artistId]
  );
  return result.rows;
}

// Export the functions
export { getAllAlbums, getAlbumById, addAlbum, deleteAlbum, getAlbumsByGenreId, getAlbumsByArtistId };
