const Image = require("../../api/v1/images/model");
const { NotFoundError } = require("../../errors");

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

// tambahkan function checking Image
const checkingImage = async (id) => {
  const result = await Image.findOne({ _id: id });

  if (!result) throw new NotFoundError(`Tidak ada Gambar dengan id :  ${id}`);

  return result;
};

// export function checkingImage
module.exports = { createImage, checkingImage };
