const Talents = require("../../api/v1/talents/model");
const { checkingImage } = require("./image");

// import custom error not found dan bad bad request
const { NotFoundError, BadRequestError } = require("../../errors");

const getAllTalents = async (req) => {
  const { keyword } = req.query;

  let condition = { organizer: req.user.organizer };

  if (keyword)
    condition = { ...condition, name: { $regex: keyword, $options: "i" } };

  const result = await Talents.find(condition)
    .populate({
      path: "image",
      select: "name",
    })
    .select("role image name");
  return result;
};

const createTalents = async (req) => {
  const { name, role, image } = req.body;

  // cari image dengan field name
  await checkingImage(image);

  // cari talents dengan field name
  const check = await Talents.findOne({ name, organizer: req.user.organizer });

  // jika check true / data talent sudah ada maka kita tampilkan error bad request dengan message dupicate name
  if (check) throw new BadRequestError("Speaker name has been register!");

  const result = await Talents.create({
    name,
    role,
    image,
    organizer: req.user.organizer,
  });

  return result;
};

const getOneTalents = async (req) => {
  const { id } = req.params;

  const result = await Talents.findOne({
    _id: id,
    organizer: req.user.organizer,
  })
    .populate({
      path: "image",
      select: "name",
    })
    .select("name role image");

  if (!result) throw new NotFoundError(`No speaker with id: ${id}`);

  return result;
};

const updateTalents = async (req) => {
  const { id } = req.params;
  const { name, role, image } = req.body;

  // cari image dengan field image
  await checkingImage(image);

  // cari talents dengan field name dan id selain dari yang dikirim dari params
  const check = await Talents.findOne({
    name,
    _id: { $ne: id },
    organizer: req.user.organizer,
  });

  // jika check true / data talent sudah ada maka kita tampilkan error bad request dengan message dupicate name
  if (check) throw new BadRequestError("Speaker name has been register!");

  const result = await Talents.findOneAndUpdate(
    { _id: id },
    { name, role, image, organizer: req.user.organizer },
    { new: true, runValidators: true }
  );

  // jika id result false / null maka akan menampilkan error `Tidak ada pembicara dengan id` yang dikirim client
  if (!result) throw new NotFoundError(`No speaker with id: ${id}`);

  return result;
};

const deleteTalents = async (req) => {
  const { id } = req.params;

  const result = await Talents.findOne({
    _id: id,
    organizer: req.user.organizer,
  });

  if (!result) throw new NotFoundError(`No speaker with id: ${id}`);

  await result.remove();

  return result;
};

const checkingTalents = async (id) => {
  const result = await Talents.findOne({ _id: id });

  if (!result)
    throw new NotFoundError(`Tidak ada pembicara dengan id :  ${id}`);

  return result;
};

module.exports = {
  getAllTalents,
  createTalents,
  getOneTalents,
  updateTalents,
  deleteTalents,
  checkingTalents, // <-- export function checking talents
};
