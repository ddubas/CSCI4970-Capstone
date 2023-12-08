// Postgres credentials needed to connect to the DB
const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  password: 'csci4970',
  database: 'algoprodb',
  host: 'localhost',
  port: 5432
});

module.exports = pool;