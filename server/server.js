const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const profileRoutes = require('./routes/profiles');
const connectDB = require('./config/db');

dotenv.config();

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors()); // Enable CORS

// Increase the limit of the JSON payload (body)
app.use(express.json({ limit: '10mb' })); // Increase limit to 10MB or as required
app.use(express.urlencoded({ limit: '10mb', extended: true }));

// Routes
app.use('/api/profiles', profileRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
