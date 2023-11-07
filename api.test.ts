const request = require('supertest');
const app = require('./express-app.ts'); // Import your Express app instance
const db = require('./test-database.ts'); // Import the test database setup

// Your test code that uses 'app' and 'db'
// Test the Express app
describe('Express App', () => {
  // Define a test case for a specific route
  it('should return "Hello, World!" from the root route', async () => {
    const response = await request(app).get('/');
    expect(response.status).toBe(200);
    expect(response.text).toBe('Hello, World!');
  });
});

  // Add more test cases for other routes and scenarios

// Test the database
describe('Database', () => {
  // Define a test case to check if a table contains data
  it('should have data in the "users" table', (done) => {
    db.all('SELECT * FROM users', [], (err: Error | null, rows: any[]) => {
      if (err) {
        throw err;
      }
      expect(rows.length).toBeGreaterThan(0);
      done();
    });
  });


// Export the app for testing
module.exports = app;

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database(':memory:');

// Create tables and insert test data
db.serialize(() => {
  // Create a "users" table
  db.run("CREATE TABLE users (id INT, username TEXT, email TEXT)");

  // Insert test data into the "users" table
  const insertUser = db.prepare("INSERT INTO users VALUES (?, ?, ?)");
  insertUser.run(1, 'user1', 'user1@example.com');
  insertUser.run(2, 'user2', 'user2@example.com');
  insertUser.finalize(); // Finalize the prepared statement

  // Create other tables and insert more test data as needed
});

// Export the database for use in your tests
module.exports = db;


afterAll(async () => {
  // Close the test database and stop the Express app after tests
  return new Promise<void>((resolve) => {
    db.close(() => {
      app.server.close(() => {
        resolve();
      });
    });
  });
});


});
