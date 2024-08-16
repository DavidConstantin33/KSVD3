const express = require('express');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

const db = new sqlite3.Database('./emails.db');

db.run('CREATE TABLE IF NOT EXISTS emails (id INTEGER PRIMARY KEY AUTOINCREMENT, email TEXT UNIQUE)');

app.post('/submit-email', (req, res) => {
    const email = req.body.email;

    db.run('INSERT INTO emails (email) VALUES (?)', [email], (err) => {
        if (err) {
            res.send('Error: Email may already exist in the database.');
        } else {
            res.send('Email saved successfully!');
        }
    });
});

app.get('/view-emails', (req, res) => {
    db.all('SELECT email FROM emails', [], (err, rows) => {
        if (err) {
            res.send('Error retrieving emails');
        } else {
            res.send(rows.map(row => row.email).join('<br>'));
        }
    });
});

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});

