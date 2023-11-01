import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import path from 'path';
const loginRoute = require('./Server/routes/login');
const pool = require("./Server/data/db")
const upload = require('./Server/upload/upload');
const studentRoute = require('./Server/routes/student');
const teacherRoute = require('./Server/routes/teacher');
dotenv.config();

const app: Express = express();

app.use(express.json()); // => req.body

// Set up static file serving for the 'Client' directory
app.use(express.static(path.join(__dirname, 'Client')));

const port = process.env.PORT || 3030;

app.use(express.static(path.join(__dirname, "Client/Styles/")));

app.use(loginRoute);
app.use(studentRoute);
app.use(teacherRoute);

// Get a user
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
        console.log("Login successful");

        if (user.isteacher === true) {
          console.log("Redirecting to teacher page");
          return res.redirect('/Teacher/Home'); // Redirect to the teacher home page
        } else {
          console.log("Redirecting to student page");
          res.redirect('/Student/Home'); // Redirect to the student home page
        }
      } else {
        console.log("Invalid password");
      }
    } else {
      console.log("User not found");
    }
  } catch (err) {
    console.error(err);
  }
});

// Insert a user
app.post("/user/add", async (req, res) => {
  try {
    const { username, password, isteacher } = req.body;
    const newUser = await pool.query(
      "INSERT INTO users (username, password, isteacher) VALUES ($1, $2, $3) RETURNING *",
      [username, password, isteacher]
    );
    res.json(newUser.rows[0]); //Shows the json of the newly created user

  } catch (err: any) {
    if (err instanceof Error) {
      console.log(err.message);
    } else {
      console.log("An unknown error occurred:", err);
    }
  }
});

// Update a user
app.put("/user/update/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { username, password, isteacher } = req.body;

    const updateUser = await pool.query("UPDATE users SET username = $1, password = $2, isteacher = $3 WHERE userid = $4", [username, password, isteacher, id]);
    res.json("User was updated");
  } catch (err: any) {
    if (err instanceof Error) {
      console.log(err.message);
    } else {
      console.log("An unknown error occurred:", err);
    }
  }
});

// Delete a user
app.delete("/user/delete/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const deleteUser = await pool.query("DELETE FROM users WHERE userid = $1", [id]);
    res.json("User was successfully deleted");
  } catch (err: any) {
    if (err instanceof Error) {
      console.log(err.message);
    } else {
      console.log("An unknown error occurred:", err);
    }
  }
});

// Set up a route for file uploads
app.post("/upload", upload.single('file'), (req, res) => {
  // Handle the uploaded file
  //console.log(req.file)
  res.json({ message: 'File uploaded successfully!' });
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
