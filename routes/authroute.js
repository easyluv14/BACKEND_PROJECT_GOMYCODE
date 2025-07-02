const express = require('express');
const { body } = require('express-validator');
const {
  registerUser,
  getAllUsers,
  loginUser
} = require('../controllers/authcontroller');

const router = express.Router();

// Validation rules for user registration
const registerValidation = [
  body('name')
    .notEmpty()
    .withMessage('Name is required')
    .isLength({ min: 2, max: 50 })
    .withMessage('Name must be between 2 and 50 characters')
    .trim(),
  body('email')
    .isEmail()
    .withMessage('Please provide a valid email')
    .normalizeEmail(),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long')
];

// Validation rules for user login
const loginValidation = [
  body('email')
    .isEmail()
    .withMessage('Please provide a valid email')
    .normalizeEmail(),
  body('password')
    .notEmpty()
    .withMessage('Password is required')
];

// Routes - Fixed route definitions
router.post('/register', registerValidation, registerUser);
router.post('/login', loginValidation, loginUser);
router.get('/', getAllUsers);

module.exports = router;