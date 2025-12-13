const db = require("./pool");

async function selectAllCategories() {
  const result = await db.query("SELECT * FROM categories ORDER BY id");
  return result.rows;
}

module.exports = { selectAllCategories };
