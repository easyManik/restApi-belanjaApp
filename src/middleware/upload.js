const multer = require('multer');

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, './tmp');
  },
  filename(req, file, cb) {
    const uniq = Date.now() + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + '-' + uniq + '.png');
  },
});

const upload = multer({
  storage: storage,
  limits: {
    fieldNameSize: 300,
    fileSize: 248576, // 2 Mb
  },
  fileFilter: (req, file, cb) => {
    const acceptableExtensions = ['.png', '.jpg', '.jpeg'];
    if (!acceptableExtensions.includes(Path.extname(file.originalname))) {
      return cb(new Error('...'));
    }

    // added this
    const fileSize = parseInt(req.headers['content-length']);
    if (fileSize > 1048576) {
      return cb(new Error('...'));
    }
    // --

    cb(null, true);
  },
});

module.exports = upload;
