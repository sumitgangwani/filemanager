const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const { createFolder } = require('../controllers/folderController');

// Create Folder
router.post('/create', authMiddleware, createFolder);

// Additional routes for subfolders, file uploads, etc.

module.exports = router;
