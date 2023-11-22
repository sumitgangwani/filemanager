// CREATE TABLE files (
//     id SERIAL PRIMARY KEY,
//     name VARCHAR(255) NOT NULL,
//     size BIGINT NOT NULL,
//     upload_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
//     user_id INTEGER REFERENCES users(id),
//     folder_id INTEGER REFERENCES folders(id)
// );


// src/models/file.js
const db = require('../config/db');

const createFile = async (name, size, uploadDate, userId, folderId) => {
  try {
    const newFile = await db.one('INSERT INTO files(name, size, upload_date, user_id, folder_id) VALUES($1, $2, $3, $4, $5) RETURNING id, name, size, upload_date, user_id, folder_id', [name, size, uploadDate, userId, folderId]);

    return newFile;
  } catch (err) {
    throw err;
  }
};

// Add other file-related functions as needed

module.exports = {
  createFile,
  // Add other exports as needed
};
