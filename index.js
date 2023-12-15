/**
 * Main application file for the web server.
 * Initializes Express, sets up routes, and handles user authentication and data manipulation.
 */

const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
const session = require('express-session');

const loginRoute = require('./Server/routes/login');
const pool = require("./Server/data/db");
const upload = require('./Server/upload/upload');
const studentRoute = require('./Server/routes/student');
const teacherRoute = require('./Server/routes/teacher');
const fs = require('fs');
const ejs = require('ejs');

dotenv.config();
const app = express();
app.use(express.json()); // => req.body
app.use(express.static(path.join(__dirname, 'Client')));
app.use(express.static(path.join(__dirname, "Client/Styles/")));
app.use(loginRoute);
app.use(studentRoute);
app.use(teacherRoute);

app.use(
  session({
    secret: process.env.SECRETKEY || 'backupkey',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 3600000 } // 1 hour
  })
);

/**
 * Handle user login.
 * @function
 * @name app.post('/user/login')
 * @memberof app
 * @param {string} '/user/login' - The route for user login.
 * @param {Function} asyncMiddleware - Middleware function for handling asynchronous operations.
 * @returns {void}
 */
app.post('/user/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    // Query the database for the user with the submitted username
    const userQuery = await pool.query(
      "SELECT users.userid, users.username, users.password, users.isteacher, assignment.exerid FROM users LEFT JOIN assignment ON users.userid = assignment.userid LEFT JOIN exercises ON exercises.exerid = assignment.exerid WHERE username = $1", [username]);

    // Create user record
    const user = userQuery.rows[0];

    // Check if record is in the database and a valid password
    if (userQuery.rows.length > 0 && user.password === password) {
      
      // Check if the user is authenticated in the session
      if (!req.session.authenticated) {
        console.log("Login successful");

        // Set session data to track
        req.session.authenticated = true;
        req.session.user = {
          userid: user.userid,
          exerid: user.exerid // modify later
        };
        console.log(req.session.user);

      } else {
        console.log("User authenticated");
      }

      // Route users accordingly
      if (user.isteacher === true) {
        console.log("Redirecting to the teacher page");
        return res.redirect('/Teacher/Assignments'); // Redirect to the teacher home page
      } else {
        console.log("Redirecting to the student page");
        return res.redirect('/Student/Assignments'); // Redirect to the student home page
      }

    } else {
      console.log("User not found or invalid password");
      return res.redirect('/login');
    }

  } catch (err) {
    console.error(err);
  }
});

/**
 * Insert a new user.
 * @function
 * @name app.post("/user/add")
 * @memberof app
 * @param {string} '/user/add' - The route for adding a new user.
 * @param {Function} asyncMiddleware - Middleware function for handling asynchronous operations.
 * @returns {void}
 */
app.post("/user/add", async (req, res) => {
  try {
    const { username, password, boolIsTeacher, email } = req.body;
    const newUser = await pool.query(
      "INSERT INTO users (username, password, isteacher, email) VALUES ($1, $2, $3, $4) RETURNING *",
      [username, password, boolIsTeacher, email]
    );

    const insertedUser = newUser.rows[0];
    if (newUser.rows.length === 1) {
      console.log("User Successfully added.");
      if (insertedUser.isteacher === true) {
        console.log("Redirecting to the teacher page");
        return res.redirect('/Teacher/Home'); // Redirect to the teacher home page
      } else {
        console.log("Redirecting to the student page");
        res.redirect('/Student/Home'); // Redirect to the student home page
      }
    } else {
      console.log("Unable to add a new user.");
    }
  } catch (err) {
    if (err instanceof Error) {
      console.log(err.message);
    } else {
      console.log("An unknown error occurred:", err);
    }
  }
});

/**
 * Update a user.
 * @function
 * @name app.put("/user/update/:id")
 * @memberof app
 * @param {string} '/user/update/:id' - The route for updating a user.
 * @param {Function} asyncMiddleware - Middleware function for handling asynchronous operations.
 * @returns {void}
 */
app.put("/user/update/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { username, password, isteacher } = req.body;

    const updateUser = await pool.query("UPDATE users SET username = $1, password = $2, isteacher = $3 WHERE userid = $4", [username, password, isteacher, id]);
    res.json("User was updated");
  } catch (err) {
    if (err instanceof Error) {
      console.log(err.message);
    } else {
      console.log("An unknown error occurred:", err);
    }
  }
});

/**
 * Delete a user.
 * @function
 * @name app.delete("/user/delete/:id)
 * @memberof app
 * @param {string} '/user/delete/:id' - The route for deleting a user.
 * @param {Function} asyncMiddleware - Middleware function for handling asynchronous operations.
 * @returns {void}
 */
app.delete("/user/delete/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const deleteUser = await pool.query("DELETE FROM users WHERE userid = $1", [id]);
    res.json("User was successfully deleted");
  } catch (err) {
    if (err instanceof Error) {
      console.log(err.message);
    } else {
      console.log("An unknown error occurred:", err);
    }
  }
});

/**
 * Route for file uploads.
 * @function
 * @name app.post('/upload')
 * @memberof app
 * @param {string} "/upload" - The route for handling file uploads.
 * @param {Function} upload.any - Middleware for handling file uploads.
 * @returns {void}
 */
app.post("/upload", upload.any(), (req, res) => {
  // Handle the uploaded file
  // console.log(req.body)

  console.log(req.body);

  // Declare variables
  const file = req.body.file;
  const hint = req.body.hint;
  const exnum = req.body.exnum;
  const answer = req.body.answer;

  // Convert file to string for the database
  const fileLocation = './Server/upload/storage/' + file;
  const buffer = fs.readFileSync(fileLocation);
  const codeseg = buffer.toString();

  // Insert records to the exercise table
  try {
    const newEx = pool.query(
      "INSERT INTO exercises (codeseg, hint, answer, exnum) VALUES ($1, $2, $3, $4)",
      [codeseg, hint, answer, exnum]
    );
  } catch (err) {
    if (err instanceof Error) {
      console.log(err.message);
    } else {
      console.log("An unknown error occurred:", err);
    }
  }
  res.json({ message: 'File uploaded successfully!', codeseg });
});

/**
 * Code segment parser.
 * @function
 * @name app.get('/user/exercise')
 * @memberof app
 * @param {string} '/user/exercise' - The route for fetching user exercises.
 * @param {Function} asyncMiddleware - Middleware function for handling asynchronous operations.
 * @returns {void}
 */
app.get('/user/exercise', async (req, res) => {
  try {
    const { userid, exerid } = req.params;
    // Query the database for the user
    const userQuery = await pool.query(
      "SELECT users.userid, assignment.exerid, exercises.codeseg, exercises.hint, exercises.answer, exercises.exnum FROM assignment JOIN users ON users.userid = assignment.userid JOIN exercises ON exercises.exerid = assignment.exerid WHERE users.userid = $1 AND exercises.exerid = $2", [userid, exerid]);

    // Check if a user returns exercises
    if (userQuery.rows.length === 1) {
      const user = userQuery.rows[0];
      console.log("Exercise exists for user");
    } else {
      console.log("No exercise exists for user");
    }

    // Get codeseg from the database
    const codesegFromDB = userQuery.rows[0].codeseg;

    // Split the string based on \r\n
    const lines = codesegFromDB.split(/\r?\n/);

    // Read Exercise View HTML
    const htmlTemplate = fs.readFileSync('Client/Webpages/StudentView/StudentExercisePage.html', 'utf8');

    // Render HTML with array values
    const renderedHTML = ejs.render(htmlTemplate, { lineValues: lines });

    // Send the HTML
    res.send(renderedHTML);

  } catch (err) {
    console.error(err);
  }
});

/**
 * Route to get user assignments by course.
 * @function
 * @name app.get('/user/assignmentsCourse')
 * @memberof app
 * @param {string} '/user/assignmentsCourse' - The route for fetching user assignments by course.
 * @param {Function} asyncMiddleware - Middleware function for handling asynchronous operations.
 * @returns {void}
 */
app.get('/user/assignmentsCourse', (req, res) => {
  let sessionID = req.session;
  console.log(sessionID);
  pool.query(`SELECT course FROM users WHERE users.userid = $1`, [32], (err, result) => {
    if (!err) {
      res.send(result.rows);
    }
  });
  pool.end;
});

/**
 * Route to get user assignments.
 * @function
 * @name app.get('/user/assignments')
 * @memberof app
 * @param {string} '/user/assignments' - The route for fetching user assignments.
 * @param {Function} asyncMiddleware - Middleware function for handling asynchronous operations.
 * @returns {void}
 */
app.get('/user/assignments', (req, res) => {
  const { username } = req.body;
  pool.query(`SELECT assignmentid FROM course`, (err, result) => {
    if (!err) {
      res.send(result.rows);
    }
  });
  pool.end;
});

/**
 * Route to get user assignments' descriptions.
 * @function
 * @name app.get('/user/assignmentsDesc')
 * @memberof app
 * @param {string} '/user/assignmentsDesc' - The route for fetching user assignments' descriptions.
 * @param {Function} asyncMiddleware - Middleware function for handling asynchronous operations.
 * @returns {void}
 */
app.get('/user/assignmentsDesc', (req, res) => {
  const { username } = req.body;
  pool.query(`SELECT description FROM assignment`, (err, result) => {
    if (!err) {
      res.send(result.rows);
    }
  });
  pool.end;
});

/**
 * Get announcements for a user.
 * @function
 * @name app.get('/user/announcement')
 * @memberof app
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {void}
 */
app.get('/user/announcement', (req, res) => {

  pool.query(`SELECT announcements FROM course`, (err, result) => {

    if (!err) {
      res.send(result.rows);
    }
  });

  pool.end;
});

/**
 * Get student grades for a user.
 * @function
 * @name app.get('/user/studentGrade')
 * @memberof app
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {void}
 */
app.get('/user/studentGrade', (req, res) => {

  pool.query(`SELECT grade FROM assignment`, (err, result) => {

    if (!err) {
      res.send(result.rows);
    }
  });

  pool.end;
});

/**
 * Get students for a specific course.
 * @function
 * @name app.get('/user/students')
 * @memberof app
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {void}
 */
app.get('/user/students', (req, res) => {

  pool.query(`SELECT username FROM users WHERE course = 1`, (err, result) => {
    if (!err) {
      res.send(result.rows);
    }
  });
  pool.end;
});

app.listen(3000, ()=>{
  console.log("RUNNING")
});

module.exports = app;