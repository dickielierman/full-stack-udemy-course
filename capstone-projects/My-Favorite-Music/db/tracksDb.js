import { db } from './db.js';

// Function to get all tracks from the database
async function getAllTracks() {
  const result = await db.query('SELECT * FROM tracks');
  return result.rows;
}

// Function to get a track by its Deezer ID
async function getTrackByDeezerId(deezerId) {
  const result = await db.query('SELECT * FROM tracks WHERE deezer_id = $1', [deezerId]);
  return result.rows[0];
}

// Function to get all albums by artist ID
async function getTracksByArtistId(artistId) {
  const result = await db.query(
    `SELECT * FROM tracks WHERE (artist->>'id')::int = $1 
    OR EXISTS ( SELECT 1 FROM json_array_elements(contributors) AS contributor 
    WHERE (contributor->>'id')::int = $1)`,
    [artistId]
  );
  return result.rows;
}

// Function to add a new track to the database
async function addTrack(data) {
  const result = await db.query(
    'INSERT INTO tracks(deezer_id, readable, title, title_short, title_version, isrc, link, share, duration, track_position, disk_number, rank, release_date, explicit_lyrics, explicit_content_lyrics, explicit_content_cover, preview, bpm, gain, available_countries, contributors, md5_image, artist, album, type) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24, $25) RETURNING *',
    [
      data.id,
      data.readable,
      data.title,
      data.title_short,
      data.title_version,
      data.isrc,
      data.link,
      data.share,
      data.duration,
      data.track_position,
      data.disk_number,
      data.rank,
      data.release_date,
      data.explicit_lyrics,
      data.explicit_content_lyrics,
      data.explicit_content_cover,
      data.preview,
      data.bpm,
      data.gain,
      JSON.stringify(data.available_countries),
      JSON.stringify(data.contributors),
      data.md5_image,
      JSON.stringify(data.artist),
      JSON.stringify(data.album),
      data.type,
    ]
  );
  return result.rows[0];
}

// Function to delete a track from the database
async function deleteTrack(deezerId) {
  const result = await db.query('DELETE FROM tracks WHERE deezer_id = $1 RETURNING *', [deezerId]);
  return result.rows[0];
}

export { getAllTracks, getTrackByDeezerId, getTracksByArtistId, addTrack, deleteTrack };
