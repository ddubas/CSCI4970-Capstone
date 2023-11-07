const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database(':memory:');

// Create tables and insert test data for the database
db.serialize(() => {
  // Add your database setup and seeding code here
});

module.exports = db;

