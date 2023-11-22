const express = require('express');
const jwt = require('jsonwebtoken');
const { register, login } = require('./controllers/authController.js');
const { createFolder } = require('./controllers/folderController.js');
const { uploadFile, manageFile } = require('./controllers/fileController.js');

const app = express();
const port = process.env.PORT || 3000;

// Middleware to parse JSON requests
app.use(express.json());

// Public Routes
app.post('/register', register);
app.post('/login', login);

// Public Routes (No authentication required)
app.post('/folder', createFolder);
app.post('/file/upload', uploadFile);
app.put('/file/:fileId', manageFile);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
