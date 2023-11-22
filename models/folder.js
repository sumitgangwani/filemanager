// CREATE TABLE folders (
//     id SERIAL PRIMARY KEY,
//     name VARCHAR(255) NOT NULL,
//     user_id INTEGER REFERENCES users(id),
//     parent_folder_id INTEGER REFERENCES folders(id)
// );


// src/models/folder.js
const db = require('../config/db');

const createFolder = async (name, userId, parentId) => {
  try {
    const newFolder = await db.one('INSERT INTO folders(name, user_id, parent_id) VALUES($1, $2, $3) RETURNING id, name, user_id, parent_id', [name, userId, parentId]);

    return newFolder;
  } catch (err) {
    throw err;
  }
};

// Add other folder-related functions as needed

module.exports = {
  createFolder,
  // Add other exports as needed
};
