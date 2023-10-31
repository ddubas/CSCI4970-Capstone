import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import path from 'path';
const loginRoute = require('./Server/routes/login');
const pool = require("./Server/data/db")
const upload = require('./Server/upload/upload');

dotenv.config();

const app: Express = express();

app.use(express.json()); // => req.body

// Set up static file serving for the 'Client' directory
app.use(express.static(path.join(__dirname, 'Client')));

const port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, "Client/Styles/")));

app.use(loginRoute);

// Get all users
app.get("/user/allUsers", async (req, res) => {
  try {
    const allUsers = await pool.query("SELECT * FROM users");
    res.json(allUsers.rows);

  } catch (err: any) {
    if (err instanceof Error) {
      console.log(err.message);
    } else {
      console.log("An unknown error occurred:", err);
    }
  }
});

//Get a user
app.get("/user/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const user = await pool.query("SELECT * FROM users WHERE userid = $1", [id]);
    res.json(user.rows[0]); //Shows the first instance of the select statement.

  } catch (err: any) {
    if (err instanceof Error) {
      console.log(err.message);
    } else {
      console.log("An unknown error occurred:", err);
    }
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
