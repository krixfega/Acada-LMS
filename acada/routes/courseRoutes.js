const express = require('express');
const router = express.Router();
const CourseController = require('../controllers/courseController');
const authMiddleware = require('../middleware/auth'); // Authentication middleware

// Create a new course
router.post('/create', authMiddleware, CourseController.createCourse);

// Retrieve a course by ID
router.get('/:courseId', CourseController.getCourse);

// Update a course by ID
router.put('/:courseId', authMiddleware, CourseController.updateCourse);

// Delete a course by ID
router.delete('/:courseId', authMiddleware, CourseController.deleteCourse);

module.exports = router;
