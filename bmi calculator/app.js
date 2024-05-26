const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Middleware for serving static files
app.use(express.static(path.join(__dirname, 'public')));

// Routes to serve HTML files
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

app.get('/index.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/signup', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'signup.html'));
});

app.get('/login.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

app.get('/contactus.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'contactus.html'));
});

app.get('/aboutus.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'aboutus.html'));
});

// Database connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'naeem.32', 
    database: 'bmi_calculator'
});

db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('MySQL connected...');
});

// Routes for API
app.post('/signup', (req, res) => {
    const { first_name, last_name, mobile_number, email, pass } = req.body;
    const sql = 'INSERT INTO users (first_name, last_name, mobile_number, email, password) VALUES (?, ?, ?, ?, ?)';
    db.query(sql, [first_name, last_name, mobile_number, email, pass], (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.redirect('/login.html');
    });
});

app.post('/login', (req, res) => {
    const { email, pass } = req.body;
    const sql = 'SELECT * FROM users WHERE email = ? AND password = ?';
    db.query(sql, [email, pass], (err, results) => {
        if (err) {
            return res.status(500).send(err);
        }
        if (results.length > 0) {
            res.redirect('/index.html');
        } else {
            res.send('Invalid credentials');
        }
    });
});

app.post('/calculate_bmi', (req, res) => {
    const { user_id, weight, height } = req.body;
    const bmi = weight / ((height / 100) ** 2);
    let category = '';

    if (bmi < 18.5) {
        category = 'Underweight';
    } else if (bmi >= 18.5 && bmi < 24.9) {
        category = 'Normal weight';
    } else {
        category = 'Overweight';
    }

    const sql = 'INSERT INTO bmi_data (user_id, weight, height, bmi, category) VALUES (?, ?, ?, ?, ?)';
    db.query(sql, [user_id, weight, height, bmi, category], (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.send({ bmi, category });
    });
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
