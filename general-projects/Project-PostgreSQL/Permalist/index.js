import express from 'express';
import bodyParser from 'body-parser';
import { getAllItems, addItem, updateItem, deleteItem } from './db.js';

const app = express();
const port = 3000;

// Middleware to parse URL-encoded bodies and static files from the 'public' directory
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// Route to handle the homepage
app.get('/', async (req, res) => {
  const items = await getAllItems();
  res.render('index.ejs', {
    listTitle: 'Today',
    listItems: items,
  });
});

// Route to handle adding a new item
app.post('/add', async (req, res) => {
  // Extract the new item from the request body
  const item = req.body.newItem;
  try {
    await addItem(item);
  } catch (err) {
    console.log(err.message);
  }
  res.redirect('/');
});

// Route to handle updating an existing item
app.post('/edit', async (req, res) => {
  const itemId = req.body.updatedItemId;
  const title = req.body.updatedItemTitle;
  try {
    await updateItem(itemId, title);
  } catch (err) {
    console.log(err.message);
  }
  res.redirect('/');
});

// Route to handle deleting an existing item
app.post('/delete', async (req, res) => {
  const itemId = req.body.deleteItemId;
  try {
    await deleteItem(itemId);
  } catch (err) {
    console.log(err.message);
  }
  res.redirect('/');
});

// Start the server and listen on the specified port
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
