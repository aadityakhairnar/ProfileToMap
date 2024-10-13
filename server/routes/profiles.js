const express = require('express');
const router = express.Router();
const Profile = require('../models/Profile');

// Get all profiles
router.get('/', async (req, res) => {
  try {
    const profiles = await Profile.find();
    res.json(profiles);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get a single profile
router.get('/:id', async (req, res) => {
  try {
    const profile = await Profile.findById(req.params.id);
    if (!profile) return res.status(404).json({ message: 'Profile not found' });
    res.json(profile);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a new profile
router.post('/', async (req, res) => {
  const { name, email, phone, occupation, age, description, address, bio, skills, image } = req.body;

  // Handle skills: if it's a string, convert to array, else use it directly
  const processedSkills = Array.isArray(skills) ? skills : skills ? skills.split(',').map(skill => skill.trim()) : [];

  const newProfile = new Profile({
    name,
    email,
    phone,
    occupation,
    age,
    description,
    address,
    bio,
    skills: processedSkills, // Use processed skills
    image, // Save Base64-encoded image directly
  });

  try {
    const profile = await newProfile.save();
    res.status(201).json(profile);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update a profile
router.put('/:id', async (req, res) => {
  const { name, email, phone, occupation, age, description, address, bio, skills, image } = req.body;

  // Handle skills: if it's a string, convert to array, else use it directly
  const processedSkills = Array.isArray(skills) ? skills : skills ? skills.split(',').map(skill => skill.trim()) : [];

  try {
    const updatedProfile = await Profile.findByIdAndUpdate(
      req.params.id,
      {
        name,
        email,
        phone,
        occupation,
        age,
        description,
        address,
        bio,
        skills: processedSkills, // Use processed skills
        image, // Save Base64-encoded image directly
      },
      { new: true }
    );
    res.json(updatedProfile);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a profile
router.delete('/:id', async (req, res) => {
  try {
    await Profile.findByIdAndDelete(req.params.id);
    res.json({ message: 'Profile deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
