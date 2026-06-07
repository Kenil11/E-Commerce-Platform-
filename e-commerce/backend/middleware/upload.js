const multer = require("multer");

const storage = multer.memoryStorage();

const allowedMimeTypes = [
  "image/jpeg",
  "image/png",
  "image/jpg",
  "application/pdf",
];

const upload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
  fileFilter: (req, file, cb) => {
    if (!allowedMimeTypes.includes(file.mimetype)) {
      const error = new Error("Only JPG, PNG, WEBP and PDF files are allowed");
      error.statusCode = 400;

      return cb(error, false);
    }

    cb(null, true);
  },
});

module.exports = upload;
