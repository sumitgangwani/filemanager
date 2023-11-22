const AWS = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
const db = require('../config/db');



// Configure AWS SDK
AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

const s3 = new AWS.S3();

// Multer configuration for file upload
const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: AWS_S3_BUCKET_NAME,
    acl: 'public-read', // Make uploaded files public
    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key: function (req, file, cb) {
      cb(null, Date.now().toString() + '-' + file.originalname);
    },
  }),
});

// File Upload
const uploadFile = upload.single('file');

// File Management (rename, move, delete)
const manageFile = async (req, res) => {
  const { fileId } = req.params;
  const { newName, newFolderId } = req.body;

  try {
    // Retrieve file information
    const file = await db.one('SELECT * FROM files WHERE id = $1', [fileId]);

    if (!file) {
      return res.status(404).json({ msg: 'File not found.' });
    }

    // Implement file management logic here (rename, move, delete)

    // For simplicity, let's just update the file name and folder id
    const updatedFile = await db.one(
      'UPDATE files SET name = $1, folder_id = $2 WHERE id = $3 RETURNING id, name, size, upload_date, user_id, folder_id',
      [newName, newFolderId, fileId]
    );

    res.json({ file: updatedFile });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};

module.exports = { uploadFile, manageFile };
