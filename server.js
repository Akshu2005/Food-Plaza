const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Serve static files (e.g., HTML, CSS)
app.use(express.static('public'));

// POST route to handle form submission
app.post('/submit-form', (req, res) => {
    const { name, email, datetime, people, message } = req.body;

    // Create transporter object using SMTP transport
    const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'srivastavaakanksha875@gmail.com', // Your Gmail email address
            pass: 'Seemu@2415' // Your Gmail password
        }
    });

    // Email options
    const mailOptions = {
        from: 'your_email@gmail.com',
        to: 'srivastavaakanksha875@example.com', // Your email address where you want to receive reservations
        subject: 'New Reservation',
        text: `Name: ${name}\nEmail: ${email}\nDate & Time: ${datetime}\nNo Of People: ${people}\nSpecial Request: ${message}`
    };

    // Send email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error(error);
            res.status(500).send('Failed to send email');
        } else {
            console.log('Email sent: ' + info.response);
            res.status(200).send('Reservation successful!');
        }
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
