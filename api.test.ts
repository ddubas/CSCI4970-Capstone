import request from 'supertest';
import app from './index'; // Adjust the path to your index file

describe('Express Routes', () => {
  afterAll(() => {
    // Close any resources (e.g., database connections) after all tests
  });

  it('should respond with login success', async () => {
    const response = await request(app)
      .post('/user/login')
      .send({
        username: 'testuser',
        password: 'testpassword',
      });

    expect(response.status).toBe(200); // Adjust the expected status code
    // Add more assertions based on your expected behavior
  });

  it('should add a new user', async () => {
    const response = await request(app)
      .post('/user/add')
      .send({
        username: 'newuser',
        password: 'newpassword',
        boolIsTeacher: false,
        email: 'newuser@example.com',
      });

    expect(response.status).toBe(200); // Adjust the expected status code
    // Add more assertions based on your expected behavior
  });

  // Add more test cases for other routes and functionality
});
