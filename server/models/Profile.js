const mongoose = require('mongoose');

// Define the Profile Schema
const ProfileSchema = new mongoose.Schema({
  id: { type: mongoose.Schema.Types.ObjectId, auto: true },
  image: { type: String}, // Unique identifier
  name: { type: String, required: true }, // Full name of the individual
  email: { type: String, required: true, unique: true }, // Email address
  phone: { type: String, required: true }, // Contact number
  occupation: { type: String, required: true }, // Job title or occupation
  age: { type: Number, required: true }, // Age of the individual
  address: {
    street: String,
    city: String,
    state: String,
    country: String,
    zipCode: String,
  }, // Residential or work address
  description: { type: String }, // Brief description of professional background or skills
  bio: String, // Optional biography
  skills: [String], // Array of skills
  createdAt: { type: Date, default: Date.now }, // Automatically set creation date
});

// Export the Profile model
module.exports = mongoose.model('Profile', ProfileSchema);
