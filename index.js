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

// Set up static file serving for the 'Client' directory
app.use(express.static(path.join(__dirname, 'Client')));

const port = process.env.PORT || 3000;

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

// Get a user
app.post('/user/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    // Query the database for the user with the submitted username
    //const userQuery = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
    const userQuery = await pool.query(
      "SELECT users.userid, users.username, users.password, users.isteacher, assignment.exerid FROM assignment JOIN users ON users.userid = assignment.userid JOIN exercises ON exercises.exerid = assignment.exerid WHERE username = $1",  [username]);
    // CURRENT PROBLEM: The query only returns a user if they have exercises assigned to them from the assignment table
    //Create user record
    const user = userQuery.rows[0];
      console.log(user);
    //Check if record is in database and a valid password
    if (userQuery.rows.length === 1 && user.password === password) {
      
      //Check if user is authenticated in the session
      if (!req.session.authenticated) {
        console.log("Login successful");

        //Set session data to track
        req.session.authenticated = true;
        req.session.user = {
          userid: user.userid,
          exerid: user.exerid //modify later
        }
        console.log(req.session.user)

      } else {
        console.log("User authenticated")
      }

      //Route users accordingly
      if (user.isteacher === true) {
        console.log("Redirecting to teacher page");
        return res.redirect('/Teacher/Home'); // Redirect to the teacher home page
      } else {
        console.log("Redirecting to student page");
        return res.redirect('/Student/Home'); // Redirect to the student home page
      }

    } else {
      console.log("User not found or invalid password");
    }

  } catch (err) {
    console.error(err);
  }
});

// Insert a user
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
        console.log("Redirecting to teacher page");
        return res.redirect('/Teacher/Home'); // Redirect to the teacher home page
      } else {
        console.log("Redirecting to student page");
        res.redirect('/Student/Home'); // Redirect to the student home page
      }
    } else {
      console.log("Unable to add a new user.")
    }
  } catch (err) {
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
  } catch (err) {
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
  } catch (err) {
    if (err instanceof Error) {
      console.log(err.message);
    } else {
      console.log("An unknown error occurred:", err);
    }
  }
});

//Route for file uploads
app.post("/upload", upload.any(), (req, res) => {
  //Handle the uploaded file
  //console.log(req.body)

  console.log(req.body)

  //Declare variables
  const file = req.body.file
  const hint = req.body.hint
  const exnum = req.body.exnum
  const answer = req.body.answer

  console.log(file)
  console.log(hint)
  console.log(exnum)
  console.log(answer)

  //Convert file to string for database
  const fileLocation = './Server/upload/storage/' + file
  const buffer = fs.readFileSync(fileLocation)
  const codeseg = buffer.toString();

  //Insert records to exercise table
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

//Code segment parser
app.get('/user/exercise', async (req, res) => {
  try {
    const { userid, exerid } = req.params;
    // Query the database for the user
    const userQuery = await pool.query(
      "SELECT users.userid, assignment.exerid, exercises.codeseg, exercises.hint, exercises.answer, exercises.exnum FROM assignment JOIN users ON users.userid = assignment.userid JOIN exercises ON exercises.exerid = assignment.exerid WHERE users.userid = $1 AND exercises.exerid = $2", [userid, exerid]);

    // Check if a user returns exercises
    if (userQuery.rows.length === 1) {
      const user = userQuery.rows[0];
      console.log("Exercise exists for user")
    } else {
      console.log("No exercise exists for user")
    }

    //get codseg from db
    const codesegFromDB = userQuery.rows[0].codeseg;

    // Split the string based on \r\n
    const lines = codesegFromDB.split(/\r?\n/);

    //read Exercise View html
    const htmlTemplate = fs.readFileSync('Client/Webpages/StudentView/StudentExercisePage.html', 'utf8');

    //render HTML with array values
    const renderedHTML = ejs.render(htmlTemplate, { lineValues: lines });

    //send the HTML
    res.send(renderedHTML);

  } catch (err) {
    console.error(err);
  }
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);


});

app.get('/user/home', (req, res) => {
  const { username } = req.body;
  pool.query(`Select sections from users`, (err, result) => {
    if (!err) {
      res.send(result.rows);
    }
  });
  pool.end;
})



module.exports = app;