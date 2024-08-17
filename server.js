const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
require('dotenv').config(); // Ensure environment variables are loaded

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

const mongoURI = process.env.MONGO_URI;

if (!mongoURI) {
    console.error('MONGO_URI environment variable is not set.');
    process.exit(1);
}

mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => {
    console.log('MongoDB connected');
})
.catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1); // Exit process if database connection fails
});

const emailSchema = new mongoose.Schema({
    email: { type: String, unique: true, required: true }
});

const Email = mongoose.model('Email', emailSchema);

app.use(express.static(path.join(__dirname, 'public')));

app.post('/submit-email', async (req, res) => {
    try {
        const email = new Email({ email: req.body.email });
        await email.save();
        res.sendFile(path.join(__dirname, 'public', 'success.html'));
    } catch (err) {
        console.error('Error saving email:', err);
        res.status(500).send('Internal Server Error');
    }
});

app.get('/view-emails', async (req, res) => {
    try {
        const emails = await Email.find({}, 'email');
        res.send(emails.map(e => e.email).join('<br>'));
    } catch (err) {
        console.error('Error retrieving emails:', err);
        res.status(500).send('Internal Server Error');
    }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
