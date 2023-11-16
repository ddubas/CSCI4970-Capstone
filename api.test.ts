// server/routes/login.test.js

const request = require('supertest');
const { performLogin } = require('./index.ts');
// api.test.ts



// Mock the pool object in data/db.js
jest.mock('/home/jwilliams/CSCI4970-Capstone/Server/data/db.ts', () => ({
  pool: {
    query: jest.fn(),
  },
}));

// Mock the 'text-encoding' module
jest.mock('text-encoding');

// Mock the express app
const app = require('./index.ts'); 
it('should login successfully', async () => {
  const responsePromise = request(app).post('/user/login').send({ /* your data */ });

  // Using .then() to handle the promise
  responsePromise.then(response => {
    // Handle the response here
    console.log(response.statusCode);
    console.log(response.body);
  }).catch(error => {
    // Handle errors if any
    console.error(error);
  });

  // ... rest of the test
});



describe('Express App', () => {
  // Test login route
  it('should login successfully', async () => {
    // Mock the behavior of the pool.query method
    require('../Server/data/db.ts').pool.query.mockResolvedValueOnce({
      rows: [{ username: 'testuser', password: 'testpassword' }],
    });

    const response = await request(app)
      .post('/user/login')
      .send({ username: 'testuser', password: 'testpassword' });

    expect(response.statusCode).toBe(200);
    // Add more assertions based on your application's behavior
  });

  // Test add user route
  it('should add a new user successfully', async () => {
    // Mock the behavior of the pool.query method for insertion
    require('../Server/data/db.ts').pool.query.mockResolvedValueOnce({
      rows: [{ username: 'newuser', password: 'newpassword', isteacher: false, email: 'newuser@example.com' }],
    });

    const response = await request(app)
      .post('/user/add')
      .send({
        username: 'newuser',
        password: 'newpassword',
        boolIsTeacher: false,
        email: 'newuser@example.com',
      });

    expect(response.statusCode).toBe(200);
    // Add more assertions based on your application's behavior
  });

  // Test update user route
  it('should update a user successfully', async () => {
    // Mock the behavior of the pool.query method for updating
    require('/home/jwilliams/CSCI4970-Capstone/Server/data/db.ts').pool.query.mockResolvedValueOnce({
      rows: [{ username: 'updateduser', password: 'updatedpassword', isteacher: true }],
    });

    const response = await request(app)
      .put('/user/update/1') // Update with a valid user ID
      .send({ username: 'updateduser', password: 'updatedpassword', isteacher: true });

    expect(response.statusCode).toBe(200);
    // Add more assertions based on your application's behavior
  });

  // Test delete user route
  it('should delete a user successfully', async () => {
    // Mock the behavior of the pool.query method for deletion
    require('/home/jwilliams/CSCI4970-Capstone/Server/data/db.ts').pool.query.mockResolvedValueOnce({});

    const response = await request(app).delete('/user/delete/1'); // Update with a valid user ID

    expect(response.statusCode).toBe(200);
    // Add more assertions based on your application's behavior
  });

  // Test file upload route
  it('should upload a file successfully', async () => {
    // Mock the behavior of the pool.query method for file upload
    require('/home/jwilliams/CSCI4970-Capstone/Server/data/db.ts').pool.query.mockResolvedValueOnce({});

    const response = await request(app)
      .post('/upload')
      .attach('file', 'path/to/testfile.txt') // Update with the path to your test file
      .field('hint', 'test hint')
      .field('exnum', '1')
      .field('answer', 'test answer');

    expect(response.statusCode).toBe(200);
    // Add more assertions based on your application's behavior
  });
});

export {}