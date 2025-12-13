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

async function addNewCategoryToDb(name, description) {
  await db.query("INSERT INTO categories (name, description) VALUES ($1,$2)", [
    name,
    description,
  ]);
}

async function addNewInstrumentToDb(name, category, price, brand, quantity) {
  await db.query(
    "INSERT INTO instruments (name, category_id, price, brand, quantity) VALUES ($1,$2,$3,$4,$5)",
    [name, category, price, brand, quantity]
  );
}

module.exports = {
  selectAllCategories,
  selectCategoryAndInstruments,
  addNewCategoryToDb,
  addNewInstrumentToDb,
};
