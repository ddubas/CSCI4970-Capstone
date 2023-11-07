const express = require('express');
const app = express();

// Middlewares
app.use(express.json()); // Parse JSON request bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded request bodies

// Example route
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

// Define more routes, middleware, and other configurations as needed

module.exports = app;

