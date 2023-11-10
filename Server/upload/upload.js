const multer = require('multer');

// Set up storage for uploaded files
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, './Server/upload/storage');
    },
    filename: (req, file, cb) => {
      let filename = Date.now() + '-' + file.originalname;
      req.body.file = filename
      cb(null, filename);
    }
  });

// Create the multer instance
const upload = multer({ storage: storage });

module.exports = upload;