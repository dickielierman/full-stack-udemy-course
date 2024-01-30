import pg from 'pg';

const db = new pg.Client({
  user: 'postgres',
  host: 'localhost',
  database: 'permalist',
  password: '',
  port: 5432,
});

db.connect();

// Function to get all items from the database
export async function getAllItems() {
  const result = await db.query('SELECT * FROM items');
  return result.rows;
}

// Function to get an item by its ID
export async function getItemById(itemId) {
  const result = await db.query('SELECT * FROM items WHERE id = $1', [itemId]);
  return result.rows[0];
}

// Function to add a new item to the database
export async function addItem(title) {
  const result = await db.query('INSERT INTO items(title) VALUES($1) RETURNING *', [title]);
  return result.rows[0];
}

// Function to update an item in the database
export async function updateItem(itemId, title) {
  const result = await db.query('UPDATE items SET title = $1 WHERE id = $2 RETURNING *', [title, itemId]);
  return result.rows[0];
}

// Function to delete an item from the database
export async function deleteItem(itemId) {
  const result = await db.query('DELETE FROM items WHERE id = $1 RETURNING *', [itemId]);
  return result.rows[0];
}
