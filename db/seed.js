require("dotenv").config();
const { Client } = require("pg");

const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl:
    process.env.NODE_ENV === "production"
      ? { rejectUnauthorized: false }
      : false,
});

async function main() {
  await client.connect();

  // Create tables if they don't exist
  await client.query(`
    CREATE TABLE IF NOT EXISTS categories (
      id SERIAL PRIMARY KEY,
      name TEXT NOT NULL,
      description TEXT
    );
  `);

  await client.query(`
    CREATE TABLE IF NOT EXISTS instruments (
      id SERIAL PRIMARY KEY,
      name TEXT NOT NULL,
      brand TEXT,
      price NUMERIC,
      quantity INTEGER,
      category_id INTEGER REFERENCES categories(id) ON DELETE CASCADE
    );
  `);

  // Clear data
  await client.query(
    `TRUNCATE instruments, categories RESTART IDENTITY CASCADE`
  );

  // Insert categories
  const categoriesResult = await client.query(`
    INSERT INTO categories (name, description) VALUES
    ('Guitars', 'Various types of guitars including acoustic and electric'),
    ('Keyboards', 'A range of keyboards and pianos'),
    ('Drums', 'Different drum sets and percussion instruments')
    RETURNING id
  `);

  const [guitars, keyboards, drums] = categoriesResult.rows;

  // Insert instruments
  await client.query(
    `
    INSERT INTO instruments (name, brand, price, quantity, category_id) VALUES
    ('Fender Stratocaster', 'Fender', 1200, 5, $1),
    ('Gibson Les Paul', 'Gibson', 1800, 3, $1),
    ('Yamaha P-45', 'Yamaha', 500, 10, $2),
    ('Roland FP-30X', 'Roland', 750, 7, $2),
    ('Pearl Drum Set', 'Pearl', 800, 3, $3),
    ('Ludwig Classic Maple', 'Ludwig', 1500, 2, $3)
    `,
    [guitars.id, keyboards.id, drums.id]
  );

  console.log("Database seeded successfully ✅");
  await client.end();
}

main().catch((err) => {
  console.error("Seeding failed ❌", err);
  client.end();
});
