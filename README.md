# Instrument Inventory

A full-stack inventory management application for organizing musical instruments by category. It provides complete create, read, update, and delete workflows backed by PostgreSQL, with server-rendered EJS views and validation at the application boundary.

## Demo

![Inventory application walkthrough](./docs/demo/demo.gif)

> No public deployment is currently available. The project can be run locally with PostgreSQL.

## Features

- Browse instrument categories and the products assigned to them
- Create, edit, and delete categories
- Create, edit, and delete individual instruments
- Store names, descriptions, manufacturers, prices, stock quantities, and category relationships
- Validate form submissions with clear error feedback
- Protect database operations with parameterized PostgreSQL queries
- Seed a development database with representative inventory data

## Tech Stack

| Area | Technology |
| --- | --- |
| Server | Node.js, Express |
| Views | EJS, CSS |
| Database | PostgreSQL, `pg` |
| Validation | express-validator |
| Development | Nodemon |

## Local Setup

```bash
git clone https://github.com/mohamedmosilhy/Inventory-Application.git
cd Inventory-Application
npm install
```

Create a database and add a `.env` file:

```env
DATABASE_URL=postgresql://USER:PASSWORD@localhost:5432/inventory
PORT=3000
```

Seed and run the application:

```bash
node db/seed.js
npm start
```

Open [http://localhost:3000](http://localhost:3000).

## Architecture

```text
app.js          Express configuration and route mounting
controllers/    Request handling and validation results
routers/        Category and instrument routes
db/             Connection pool, queries, and seed data
views/          EJS pages and reusable partials
public/         Styles and browser assets
```

The routers define the HTTP surface, controllers coordinate validation and responses, and the database layer keeps SQL outside the presentation code.
