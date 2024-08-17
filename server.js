const mongoose = require('mongoose');

// Replace with your MongoDB connection string
const mongoURI = process.env.MONGO_URI || 'your_mongo_connection_string';
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });

const emailSchema = new mongoose.Schema({
    email: { type: String, unique: true }
});

const Email = mongoose.model('Email', emailSchema);

app.post('/submit-email', (req, res) => {
    const email = new Email({ email: req.body.email });

    email.save((err) => {
        if (err) {
            res.send('Error: Email may already exist in the database.');
        } else {
            res.sendFile(path.join(__dirname, 'public', 'success.html'));
        }
    });
});

app.get('/view-emails', (req, res) => {
    Email.find({}, 'email', (err, emails) => {
        if (err) {
            res.send('Error retrieving emails');
        } else {
            res.send(emails.map(e => e.email).join('<br>'));
        }
    });
});
