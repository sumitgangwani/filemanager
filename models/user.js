// CREATE TABLE users (
//     id SERIAL PRIMARY KEY,
//     username VARCHAR(50) UNIQUE NOT NULL,
//     email VARCHAR(255) UNIQUE NOT NULL,
//     password VARCHAR(255) NOT NULL
// );


// src/models/user.js
const db = require('../config/db');

const createUser = async (username, email, password) => {
  try {
    const newUser = await db.one('INSERT INTO users(username, email, password) VALUES($1, $2, $3) RETURNING id, username, email', [username, email, password]);

    return newUser;
  } catch (err) {
    throw err;
  }
};

// Add other user-related functions as needed

module.exports = {
  createUser,
  // Add other exports as needed
};
