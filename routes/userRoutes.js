const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { register, login } = require('../controllers/authController');

// Public Routes
router.post('/register', register);
router.post('/login', login);

// Private Route (example)
router.get('/profile', (req, res) => {
  // Check for the presence of the token in the request header
  const token = req.header('x-auth-token');

  if (!token) {
    return res.status(401).json({ msg: 'Authorization denied. No token provided.' });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // Access user information using decoded.user
    res.json({ user: decoded.user });
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid.' });
  }
});

module.exports = router;
