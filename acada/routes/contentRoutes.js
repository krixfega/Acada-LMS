const express = require('express');
const router = express.Router();
const ContentController = require('../controllers/contentController');
const authMiddleware = require('../middleware/auth'); // Authentication middleware

// Create content associated with a course
router.post('/create', authMiddleware, ContentController.createContent);

// Update content by ID
router.put('/:contentId', authMiddleware, ContentController.updateContent);

// Delete content by ID
router.delete('/:contentId', authMiddleware, ContentController.deleteContent);

module.exports = router;
