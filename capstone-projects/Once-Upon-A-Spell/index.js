// Import necessary modules
import express from 'express';
import axios from 'axios';
import bodyParser from 'body-parser';
import { sortSpells } from './utils/spellUtils';

// Create an instance of the Express application
const app = express();
// Set the port for the server
const port = 3000;
// API base URL for D&D 5e API
const API_URL = 'https://www.dnd5eapi.co';

// List of player classes in D&D
const playerClasses = ['barbarian', 'bard', 'cleric', 'druid', 'fighter', 'monk', 'paladin', 'ranger', 'rogue', 'sorcerer', 'warlock', 'wizard'];

// Serve static files from the 'public' directory
app.use(express.static('public'));
// Use body-parser middleware to parse form data
app.use(bodyParser.urlencoded({ extended: true }));

// Route for the home page
app.get('/', (req, res) => {
  // Render the index page with the list of player classes
  res.render('index.ejs', { playerClasses });
});

// Route for a specific player class
app.get('/:class', async (req, res) => {
  // Get the requested player class from the URL parameters
  const thisPlayerClass = req.params.class;
  // Array to store the list of spells for the player class
  const spellList = [];

  try {
    // Make a request to the D&D 5e API to get the list of spells for the player class
    const response = await axios.get(`${API_URL}/api/classes/${thisPlayerClass}/spells`);
    const result = response.data;
    const totalCount = Number(result.count);

    // If there are spells for the player class, fetch details for each spell
    if (totalCount > 0) {
      const spellRequests = result.results.map(async (spell) => {
        const thisSpell = { name: spell.name };
        try {
          // Make a request to the D&D 5e API to get details of the spell
          const response = await axios.get(`${API_URL}${spell.url}`);
          const result = response.data;
          thisSpell.data = result;
          spellList.push(thisSpell);
        } catch (error) {
          console.error('Failed to fetch spell:', error.message);
        }
      });

      // Wait for all spell requests to complete before sorting
      await Promise.all(spellRequests);
      spellList.sort(sortSpells);
    }

    // Log success and render the player class page with spell details
    console.log(`Successfully fetched ${spellList.length} spells for ${thisPlayerClass}`);
    res.render('player-class.ejs', { playerClass: thisPlayerClass, spellList, total: totalCount });
  } catch (error) {
    // Log error and set HTTP status to 500 (Internal Server Error)
    console.error('Failed to make request:', error.message);
    res.status(500);
  }
});

// 404 route handler
app.get('*', function (req, res) {
  res.status(404).send('It seems our adventure has come to an untimely end.', 404);
});

// Start the server and listen on the specified port
app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
