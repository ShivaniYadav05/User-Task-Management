const express = require('express');
const router = express.Router();
const User = require('../model/user');
const { generateBio } = require('../services/aiService');

// Create user
router.post('/', async (req, res) => {
  try {
    const { name, email, role, status } = req.body;
    // generate bio
    const bio = await generateBio(name, role);

    const user = new User({ name, email, role, status, bio });
    await user.save();

    res.status(201).json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// Get all users
router.get('/', async (req, res) => {
  try {
    const users = await User.find().sort({ createdAt: -1 });
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update user
router.put('/:id', async (req, res) => {
  try {
    const { name, email, role, status } = req.body;

    // regenerate bio when name or role changes (or always — up to you)
    const bio = await generateBio(name, role);

    const user = await User.findByIdAndUpdate(req.params.id, { name, email, role, status, bio }, { new: true });
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete user
router.delete('/:id', async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
