#! /usr/bin/env node

import "dotenv/config";
import { Client } from "pg";

const SQL = `CREATE TABLE IF NOT EXISTS messages (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  username VARCHAR(255) NOT NULL,
  message TEXT NOT NUll,
  add_date TIMESTAMP DEFAULT NOW() NOT NULL
);

INSERT INTO messages (username, message)
VALUES ('Amando','Hi there!'),
('Charles','Hello World!'),
('Georgio','Lorem ipsum dolor sit amet,
consectetur adipiscing elit,
sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
Ut enim ad minim veniam,
quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.')`;

async function main() {
  console.log("Seeding...");
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
  });
  await client.connect();
  await client.query(SQL);
  await client.end();
  console.log("Done");
}

main();
