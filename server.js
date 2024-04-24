// Import required modules
const express = require('express');
const mongoose = require('mongoose');

// Create an Express application
const app = express();

// Middleware to parse JSON requests
app.use(express.json());

// MongoDB connection URI
const mongoURI = 'mongodb://localhost:27017/foodPlazaDB';

// Connect to MongoDB
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Error connecting to MongoDB:', err));

// Define schema for table booking
const bookingSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    dateTime: { type: Date, required: true },
    people: { type: Number, required: true },
    specialRequest: String
});

// Create a model for table booking
const Booking = mongoose.model('Booking', bookingSchema);

// Route to handle table booking form submission
app.post('/bookTable', async (req, res) => {
    try {
        // Extract form data
        const { name, email, dateTime, people, specialRequest } = req.body;

        // Create a new booking document
        const newBooking = new Booking({
            name,
            email,
            dateTime,
            people,
            specialRequest
        });

        // Save the booking to MongoDB
        await newBooking.save();

        // Respond with success message
        res.status(201).json({ message: 'Booking saved successfully' });
    } catch (err) {
        // Handle errors
        console.error('Error saving booking:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
