const db = require("./pool");

// Category table

// CREATE TABLE categories (
//   id SERIAL PRIMARY KEY,
//   name TEXT NOT NULL,
//   description TEXT
// );

// Instrument table

// CREATE TABLE instruments (
//   id SERIAL PRIMARY KEY,
//   name TEXT NOT NULL,
//   brand TEXT,
//   price NUMERIC,
//   quantity INTEGER,
//   category_id INTEGER REFERENCES categories(id)
// );

async function selectAllCategories() {
  const result = await db.query("SELECT * FROM categories ORDER BY id");
  return result.rows;
}

async function selectCategoryAndInstruments(id) {
  const category = await db.query("SELECT * FROM categories WHERE id =$1 ", [
    id,
  ]);

  const instruments = await db.query(
    "SELECT * FROM instruments WHERE category_id=$1",
    [id]
  );

  return { category: category.rows[0], instruments: instruments.rows };
}

module.exports = { selectAllCategories, selectCategoryAndInstruments };
