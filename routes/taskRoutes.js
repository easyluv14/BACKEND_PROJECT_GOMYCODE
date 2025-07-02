const express = require('express');
const { body, param } = require('express-validator');
const {
  createTask,
  getAllTasks,
  getTaskById,
  updateTask,
  deleteTask
} = require('../controllers/taskControllers');

const router = express.Router();

// Validation rules for creating a task
const createTaskValidation = [
  body('title')
    .notEmpty()
    .withMessage('Title is required')
    .isLength({ min: 1, max: 100 })
    .withMessage('Title must be between 1 and 100 characters')
    .trim(),
  body('description')
    .optional()
    .isLength({ max: 500 })
    .withMessage('Description cannot exceed 500 characters')
    .trim(),
  body('completed')
    .optional()
    .isBoolean()
    .withMessage('Completed must be a boolean value'),
  body('userId')
    .notEmpty()
    .withMessage('User ID is required')
    .isMongoId()
    .withMessage('Please provide a valid user ID')
];

// Validation rules for updating a task
const updateTaskValidation = [
  body('title')
    .optional()
    .isLength({ min: 1, max: 100 })
    .withMessage('Title must be between 1 and 100 characters')
    .trim(),
  body('description')
    .optional()
    .isLength({ max: 500 })
    .withMessage('Description cannot exceed 500 characters')
    .trim(),
  body('completed')
    .optional()
    .isBoolean()
    .withMessage('Completed must be a boolean value')
];

// Validation for task ID parameter
const taskIdValidation = [
  param('id')
    .isMongoId()
    .withMessage('Please provide a valid task ID')
];

// Routes - Fixed route order and definitions
router.get('/', getAllTasks);
router.post('/', createTaskValidation, createTask);
router.get('/:id', taskIdValidation, getTaskById);
router.put('/:id', taskIdValidation.concat(updateTaskValidation), updateTask);
router.delete('/:id', taskIdValidation, deleteTask);

module.exports = router;