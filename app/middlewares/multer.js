const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, `public/uploads/`);
  },

  filename: (req, file, cb) => {
    cb(
      null,
      `${Math.random().toString(36).split(".")[1]}${Math.floor(
        Math.random() * 9999999999
      )}${file.originalname}`
    );
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg"
  ) {
    cb(null, true);
  } else {
    //reject file
    cb(
      {
        message: "Unsupported file format, only jpeg, jpg, png",
      },
      false
    );
  }
};

const uploadMiddleware = multer({
  storage,
  limits: {
    fileSize: 3000000,
  },
  fileFilter,
});

module.exports = uploadMiddleware;
