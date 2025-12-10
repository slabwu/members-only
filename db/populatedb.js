#! /usr/bin/env node
require('dotenv').config()
const { Client } = require('pg')
const { argv } = require('node:process')

const url = argv[2] || process.env.DATABASE_URL

const SQL = `
CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    username VARCHAR ( 30 ),
    password VARCHAR ( 255 ),
    first_name VARCHAR ( 30 ),
    last_name VARCHAR ( 30 ),
    member BOOLEAN,
    admin BOOLEAN
);

CREATE TABLE IF NOT EXISTS posts (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    title TEXT,
    text TEXT,
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    author_id INTEGER,
    FOREIGN KEY (author_id) REFERENCES users(id) ON DELETE SET NULL
);

INSERT INTO users (username, password, first_name, last_name, member, admin) 
VALUES ('test', 'test', 'John', 'Doe', true, false);

INSERT INTO posts (title, text, author_id) 
VALUES ('Hello world!', 'Hi everyone!', 1);
`

async function main() {
  console.log('seeding...')
  const client = new Client({
    connectionString: url,
  })
  await client.connect()
  await client.query(SQL)
  await client.end()
  console.log('done')
}

main()