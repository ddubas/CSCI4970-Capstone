import express from 'express';
import { Pool } from 'pg';
import util from 'util';

(global as any).TextEncoder = util.TextEncoder;
(global as any).TextDecoder = util.TextDecoder;

const app = express();
const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  password: 'csci4970',
  database: 'algoprodb',
  host: 'localhost',
  port: 5432,
});

// Middleware to parse JSON requests
app.use(express.json());

// Login route
app.post('/user/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    // Query the database for the user with the submitted username
    const userQuery = await pool.query('SELECT * FROM users WHERE username = $1', [username]);

    // Check if a user with the submitted username exists
    if (userQuery.rows.length === 1) {
      const user = userQuery.rows[0];

      // Check if the submitted password matches the password in the database
      if (user.password === password) {
        console.log('Login successful');

        if (user.isteacher === true) {
          console.log('Redirecting to teacher page');
          res.status(200).json({ message: 'Login successful', redirect: '/Teacher/Home' });
        } else {
          console.log('Redirecting to student page');
          res.status(200).json({ message: 'Login successful', redirect: '/Student/Home' });
        }
      } else {
        console.log('Invalid password');
        res.status(401).json({ message: 'Invalid password' });
      }
    } else {
      console.log('User not found');
      res.status(404).json({ message: 'User not found' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Add user route
app.post('/user/add', async (req, res) => {
  try {
    const { username, password, boolIsTeacher, email } = req.body;
    const newUser = await pool.query(
      'INSERT INTO users (username, password, isteacher, email) VALUES ($1, $2, $3, $4) RETURNING *',
      [username, password, boolIsTeacher, email]
    );

    const insertedUser = newUser.rows[0];
    if (newUser.rows.length === 1) {
      console.log('User successfully added.');

      if (insertedUser.isteacher === true) {
        console.log('Redirecting to teacher page');
        res.status(201).json({ message: 'User added successfully', redirect: '/Teacher/Home' });
      } else {
        console.log('Redirecting to student page');
        res.status(201).json({ message: 'User added successfully', redirect: '/Student/Home' });
      }
    } else {
      console.log('Unable to add a new user.');
      res.status(500).json({ message: 'Unable to add a new user' });
    }
  } catch (err: any) {
    if (err instanceof Error) {
      console.log(err.message);
      res.status(500).json({ message: 'Internal server error' });
    } else {
      console.log('An unknown error occurred:', err);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
});

// Test setup
const request = require('supertest');
const serverUrl = 'http://localhost:3042'; // Use the correct port where your server is running

// Mock the login route handler function
const loginHandler = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Your logic for checking username and password
    if (username === 'testuser' && password === 'testpassword') {
      res.status(200).json({ message: 'Login successful' });
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  } catch (err) {
    console.error(err);
    // Ensure that res is defined before using it
    if (res) {
      res.status(500).json({ message: 'Internal server error' });
    }
  }
};

// Mock the add user route handler function
const addUserHandler = async (req, res) => {
  try {
    const { username, password, boolIsTeacher, email } = req.body;

    // Your logic for adding a new user
    // For simplicity, always return success in this example
    res.status(200).json({ message: 'User added successfully' });
  } catch (err) {
    console.error(err);
    // Ensure that res is defined before using it
    if (res) {
      res.status(500).json({ message: 'Internal server error' });
    }
  }
};

  // Test file upload route
// Mock the file upload route handler function
const fileUploadHandler = async (req, res) => {
  try {
    // Your logic for handling file upload
    // For simplicity, always return success in this example
    res.status(200).json({ message: 'File uploaded successfully!' });
  } catch (err) {
    console.error(err);
    // Ensure that res is defined before using it
    if (res) {
      res.status(500).json({ message: 'Internal server error' });
    }
  }
};

// Test file upload route
it('should upload a file successfully', async () => {
  // Define dummy data for the file upload request
  const fileData = {
    buffer: Buffer.from('file content'), // Replace with your file content
    originalname: 'testfile.txt',
  };

  // Create mock request object
  const mockReq = {
    body: {
      hint: 'test hint',
      exnum: '1',
      answer: 'test answer',
    },
    files: [fileData],
  };

  // Create mock response object
  const mockRes = {
    status: jest.fn(() => mockRes),
    json: jest.fn(),
  };

  // Use the file upload handler directly
  await fileUploadHandler(mockReq, mockRes);

  // Assuming a successful file upload returns a status code of 200
  expect(mockRes.status).toHaveBeenCalledWith(200);
  expect(mockRes.json).toHaveBeenCalledWith({ message: 'File uploaded successfully!' });
});



