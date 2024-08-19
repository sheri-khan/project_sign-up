const fs = require('fs');
const express = require('express');
 // Import file system module
const cors = require('cors');
const app = express();
const port = 3000;

// Middleware to handle CORS
app.use(cors());

// Middleware to parse JSON bodies
app.use(express.json());

// Route to handle registration form submission
app.post('/register', (req, res) => {
    const { name, email, password } = req.body;
    const data = `Received registration: Name: ${name}, Email: ${email}, Password: ${password}\n`;

    // Append data to a file
    fs.appendFile('registrations.txt', data, (err) => {
        if (err) {
            console.error('Error writing to file', err);
            res.status(500).json({ message: 'Error saving registration' });
        } else {
            console.log(data);
            res.json({ message: 'Registration successful' });
        }
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
