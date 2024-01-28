import express from 'express';
import axios from 'axios';
import bodyParser from 'body-parser';
import { sortSpells } from './utils/spellUtils';

const app = express();
const port = 3000;
const API_URL = 'https://www.dnd5eapi.co';

const playerClasses = ['barbarian', 'bard', 'cleric', 'druid', 'fighter', 'monk', 'paladin', 'ranger', 'rogue', 'sorcerer', 'warlock', 'wizard'];

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

const sortSpells = (a, b) => {
  const levelA = a.data.level || 0;
  const levelB = b.data.level || 0;
  const nameA = a.name.toLowerCase();
  const nameB = b.name.toLowerCase();

  if (levelA !== levelB) {
    return levelA - levelB;
  } else {
    return nameA.localeCompare(nameB);
  }
};

app.get('/', (req, res) => {
  res.render('index.ejs', { playerClasses });
});

app.get('/:class', async (req, res) => {
  const thisPlayerClass = req.params.class;
  const spellList = [];

  try {
    const response = await axios.get(`${API_URL}/api/classes/${thisPlayerClass}/spells`);
    const result = response.data;
    const totalCount = Number(result.count);

    if (totalCount > 0) {
      const spellRequests = result.results.map(async (spell) => {
        const thisSpell = { name: spell.name };
        try {
          const response = await axios.get(`${API_URL}${spell.url}`);
          const result = response.data;
          thisSpell.data = result;
          spellList.push(thisSpell);
        } catch (error) {
          console.error('Failed to fetch spell:', error.message);
        }
      });

      await Promise.all(spellRequests);
      spellList.sort(sortSpells);
    }

    console.log(`Successfully fetched ${spellList.length} spells for ${thisPlayerClass}`);
    res.render('player-class.ejs', { playerClass: thisPlayerClass, spellList, total: totalCount });
  } catch (error) {
    console.error('Failed to make request:', error.message);
    res.status(500);
  }
});

app.get('*', function (req, res) {
  res.status(404).send('It seems our adventure has come to an untimely end.', 404);
});

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
