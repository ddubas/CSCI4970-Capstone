global.TextEncoder = require('util').TextEncoder;
global.TextDecoder = require('util').TextDecoder;


const request = require('supertest');
const { pool } = require('./Server/data/db.ts');

const serverUrl = 'http://localhost:3042';

console.log('Pool object:', pool); 
// Ensure that you have a testing database set up for these tests

describe('POST /user/login', () => {
  it('should login successfully', async () => {
    // Define dummy data for the POST request
    const postData = {
      username: 'testuser',
      password: 'testpassword',
    };

    // Use supertest to simulate a POST request to the /user/login endpoint
    const response = await request(serverUrl)
      .post('/user/login')
      .send(postData);

    // Assuming a successful login returns a status code of 200
    expect(response.statusCode).toBe(200);
  }
  , 20000);

  // Test add user route
  it('should add a new user successfully', async () => {
    const response = await request(serverUrl)
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

  // Test delete user route
 it('should delete a user successfully', async () => {
    // Assuming there is a user with ID 1 in your testing database
    const response = await request(serverUrl).delete('/user/delete/1');

   expect(response.statusCode).toBe(200);
    // Add more assertions based on your application's behavior
  });

  // Test file upload route
/*  it('should upload a file successfully', async () => {
    const response = await request(app)
     .post('/upload')
     .attach('file', 'path/to/testfile.txt') // Update with the path to your test file
      .field('hint', 'test hint')
     .field('exnum', '1')
      .field('answer', 'test answer');

    expect(response.statusCode).toBe(200);
    // Add more assertions based on your application's behavior
  });*/
});


