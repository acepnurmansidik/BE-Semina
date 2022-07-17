const Image = require("../../api/v1/images/model");

/**
 * Cara kedua
 * generate url setelah submit baru kita simpen images
 */
const generateUrlImage = async (req) => {
  const result = `uploads/${req.file.filename}`;
  return result;
};

/**
 * Cara pertama
 */
const createImage = async (req) => {
  const result = await Image.create({
    name: req.file
      ? `uploads/${req.file.filename}`
      : `uploads/avatar/default.png`,
  });

  return result;
};

module.exports = { createImage, generateUrlImage };
