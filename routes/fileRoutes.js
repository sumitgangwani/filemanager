const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const { uploadFile, manageFile } = require('../controllers/fileController');

// Upload File
router.post('/upload', authMiddleware, uploadFile);

// Manage File (rename, move, delete)
router.put('/manage/:fileId', authMiddleware, manageFile);

// Additional routes for file-related operations

module.exports = router;
