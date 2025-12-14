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

async function editCategoryInDb(id, name, description) {
  await db.query("UPDATE categories SET name=$1, description=$2 WHERE id=$3", [
    name,
    description,
    id,
  ]);
}

async function deleteCategoryFromDb(id) {
  await db.query("DELETE FROM categories WHERE id=$1", [id]);
}

async function selectInstrument(id) {
  const result = await db.query("SELECT * FROM instruments WHERE id=$1", [id]);
  return result.rows[0];
}

async function editInstrumentInDb(
  id,
  name,
  category_id,
  price,
  brand,
  quantity
) {
  await db.query(
    "UPDATE instruments SET name=$1, category_id=$2, price=$3, brand=$4, quantity=$5 WHERE id=$6",
    [name, category_id, price, brand, quantity, id]
  );
}

async function deleteInstrumentFromDb(id) {
  await db.query("DELETE FROM instruments WHERE id=$1", [id]);
}

module.exports = {
  selectAllCategories,
  selectCategoryAndInstruments,
  addNewCategoryToDb,
  addNewInstrumentToDb,
  editCategoryInDb,
  deleteCategoryFromDb,
  selectInstrument,
  editInstrumentInDb,
  deleteInstrumentFromDb,
};
