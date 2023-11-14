"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
const loginRoute = require('./Server/routes/login');
const pool = require("./Server/data/db");
const upload = require('./Server/upload/upload');
const studentRoute = require('./Server/routes/student');
const teacherRoute = require('./Server/routes/teacher');
const fs = require('fs');
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json()); // => req.body
// Set up static file serving for the 'Client' directory
app.use(express_1.default.static(path_1.default.join(__dirname, 'Client')));
const port = process.env.PORT || 3000;
app.use(express_1.default.static(path_1.default.join(__dirname, "Client/Styles/")));
app.use(loginRoute);
app.use(studentRoute);
app.use(teacherRoute);
exports.default = app;
// Get a user
app.post('/user/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, password } = req.body;
        // Query the database for the user with the submitted username
        const userQuery = yield pool.query('SELECT * FROM users WHERE username = $1', [username]);
        // Check if a user with the submitted username exists
        if (userQuery.rows.length === 1) {
            const user = userQuery.rows[0];
            // Check if the submitted password matches the password in the database
            if (user.password === password) {
                console.log("Login successful");
                if (user.isteacher === true) {
                    console.log("Redirecting to teacher page");
                    return res.redirect('/Teacher/Home'); // Redirect to the teacher home page
                }
                else {
                    console.log("Redirecting to student page");
                    res.redirect('/Student/Home'); // Redirect to the student home page
                }
            }
            else {
                console.log("Invalid password");
            }
        }
        else {
            console.log("User not found");
        }
    }
    catch (err) {
        console.error(err);
    }
}));
// Insert a user
app.post("/user/add", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, password, boolIsTeacher, email } = req.body;
        const newUser = yield pool.query("INSERT INTO users (username, password, isteacher, email) VALUES ($1, $2, $3, $4) RETURNING *", [username, password, boolIsTeacher, email]);
        const insertedUser = newUser.rows[0];
        if (newUser.rows.length === 1) {
            console.log("User Successfully added.");
            if (insertedUser.isteacher === true) {
                console.log("Redirecting to teacher page");
                return res.redirect('/Teacher/Home'); // Redirect to the teacher home page
            }
            else {
                console.log("Redirecting to student page");
                res.redirect('/Student/Home'); // Redirect to the student home page
            }
        }
        else {
            console.log("Unable to add a new user.");
        }
    }
    catch (err) {
        if (err instanceof Error) {
            console.log(err.message);
        }
        else {
            console.log("An unknown error occurred:", err);
        }
    }
}));
// Update a user
app.put("/user/update/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { username, password, isteacher } = req.body;
        const updateUser = yield pool.query("UPDATE users SET username = $1, password = $2, isteacher = $3 WHERE userid = $4", [username, password, isteacher, id]);
        res.json("User was updated");
    }
    catch (err) {
        if (err instanceof Error) {
            console.log(err.message);
        }
        else {
            console.log("An unknown error occurred:", err);
        }
    }
}));
// Delete a user
app.delete("/user/delete/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const deleteUser = yield pool.query("DELETE FROM users WHERE userid = $1", [id]);
        res.json("User was successfully deleted");
    }
    catch (err) {
        if (err instanceof Error) {
            console.log(err.message);
        }
        else {
            console.log("An unknown error occurred:", err);
        }
    }
}));
//Route for file uploads
app.post("/upload", upload.any(), (req, res) => {
    //Handle the uploaded file
    //console.log(req.body)
    //Declare variables
    const file = req.body.file;
    const hint = req.body.hint;
    const exnum = req.body.exnum;
    const answer = req.body.answer;
    //Convert file to string for database
    const fileLocation = './Server/upload/storage/' + file;
    const buffer = fs.readFileSync(fileLocation);
    const codeseg = buffer.toString();
    //Insert records to exercise table
    try {
        const newEx = pool.query("INSERT INTO exercises (codeseg, hint, answer, exnum) VALUES ($1, $2, $3, $4)", [codeseg, hint, answer, exnum]);
    }
    catch (err) {
        if (err instanceof Error) {
            console.log(err.message);
        }
        else {
            console.log("An unknown error occurred:", err);
        }
    }
    res.json({ message: 'File uploaded successfully!', codeseg });
});
app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
