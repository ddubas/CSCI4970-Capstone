const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database(':memory:');

// Create tables and insert test data for the database
db.serialize(() => {
  // Create tables and insert test data

  // Create a "users" table
  db.run(`
    CREATE TABLE users (
      id INTEGER PRIMARY KEY,
      username TEXT,
      email TEXT
    )
  `);

  // Insert test data into the "users" table
  const insertUser = db.prepare("INSERT INTO users (username, email) VALUES (?, ?)");
  insertUser.run('user1', 'user1@example.com');
  insertUser.run('user2', 'user2@example.com');
  insertUser.finalize(); // Finalize the prepared statement

  // Add your other table creation and data insertion here

  // Database setup and seeding code
  // Add your own database setup and seeding logic here
  // For example, if you have foreign keys, constraints, or other schema adjustments, make them here

  // Export the database for use in your tests
  module.exports = db;
});
