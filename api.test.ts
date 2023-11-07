const request = require('supertest');
const app = require('./express-app.ts'); // Import your Express app instance
const db = require('./test-database.ts'); // Import the test database setup

// Your test code that uses 'app' and 'db'
// Test the Express app
describe('Express App', () => {
  // Define a test case for a specific route
  it('should return "Hello, World!" from the root route', async (done) => {
    const response = await request(app).get('/');
    expect(response.status).toBe(200);
    expect(response.text).toBe('Hello, World!');
    done();
  });

  // Add more test cases for other routes and scenarios
});

// Test the database
describe('Database', () => {
  // Define a test case to check if a table contains data
  it('should have data in the "users" table', (done) => {
    db.all('SELECT * FROM users', [], (err, rows) => {
      if (err) {
        throw err;
      }
      expect(rows.length).toBeGreaterThan(0);
      done();
    });
  });


// Export the app for testing
module.exports = app;

beforeAll(async () => {
  // Initialize and seed the test database
  // You can create tables and insert test data here

  // Start your Express app after the database is set up
  return new Promise((resolve) => {
    const server = app.listen(0, () => {
      // Attach the server instance to the app for closing later
      app.server = server;
      resolve();
    });
  });
});

afterAll(async () => {
  // Close the test database and stop the Express app after tests
  return new Promise((resolve) => {
    db.close(() => {
      app.server.close(() => {
        resolve();
      });
    });
  });
});



