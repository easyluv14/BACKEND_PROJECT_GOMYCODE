// routes/authRoutes.js
const express = require('express');
const router = express.Router();

// Import the controller functions
const { register, login } = require('../controllers/authcontroller');

// These must both be functions
router.post('/register', register);
router.post('/login', login);

module.exports = router;
