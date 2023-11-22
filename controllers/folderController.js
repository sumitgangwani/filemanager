const db = require('../config/db');

const createFolder = async (req, res) => {
  const { folderName } = req.body;
  const userId = req.user.id; // Assuming you have the user information in the request

  try {
    // Check if the folder already exists for the user
    const existingFolder = await db.oneOrNone('SELECT * FROM folders WHERE name = $1 AND user_id = $2', [folderName, userId]);
    if (existingFolder) {
      return res.status(400).json({ msg: 'Folder with the same name already exists.' });
    }

    // Create the folder
    const newFolder = await db.one('INSERT INTO folders(name, user_id) VALUES($1, $2) RETURNING id, name', [folderName, userId]);

    res.json({ folder: { id: newFolder.id, name: newFolder.name } });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};

module.exports = { createFolder };
