const express = require('express');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();
const path = require('path'); // <-- Add this line

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

const db = new sqlite3.Database('./emails.db');

db.run('CREATE TABLE IF NOT EXISTS emails (id INTEGER PRIMARY KEY AUTOINCREMENT, email TEXT UNIQUE)');

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public'))); // <-- Add this line

app.post('/submit-email', (req, res) => {
    const email = req.body.email;

    db.run('INSERT INTO emails (email) VALUES (?)', [email], (err) => {
        if (err) {
            res.send('Error: Email may already exist in the database.');
        } else {
            res.sendFile(path.join(__dirname, 'public', 'success.html'));
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

