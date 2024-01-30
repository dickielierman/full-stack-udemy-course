// Import required modules
import pg from 'pg';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// Create a PostgreSQL client
const db = new pg.Client({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

// Connect to the PostgreSQL database
db.connect();

// Export the database client instance
export { db };

// Export CRUD functions for genres
export { getAllGenres, getGenreById, addGenre, updateGenre, deleteGenre } from './genresDb.js';

// Export CRUD functions for artists
export { getAllArtists, getAllArtistsByGenre, getArtistByDeezerId, addArtist, deleteArtist } from './artistsDb.js';

// Export CRUD functions for albums
export { getAllAlbums, getAlbumById, addAlbum, deleteAlbum, getAlbumsByGenreId, getAlbumsByArtistId } from './albumsDb.js';

// Export CRUD functions for tracks
export { getAllTracks, getTrackByDeezerId, getTracksByArtistId, addTrack, deleteTrack } from './tracksDb.js';

// Close the database connection on application exit
process.on('exit', () => {
  db.end();
});
