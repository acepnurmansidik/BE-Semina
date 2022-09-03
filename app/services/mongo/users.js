const User = require("../../api/v1/users/model");
const Organizer = require("../../api/v1/organizer/model");
const { BadRequestError, NotFoundError } = require("../../errors");

const getAllOrganizers = async () => {
  const result = await Organizer.find().select("organizer");

  return result;
};

// END # ORGANIZERS =========================================================
const updateUser = async (req) => {
  const { id } = req.params;

  const result = await User.findOneAndUpdate(
    { _id: id },
    { ...req.body, organizer: req.user.organizer },
    { new: true }
  ).select("name email");

  return result;
};

const createUser = async (req) => {
  const { name, password, role, confirmPassword, email } = req.body;

  if (password !== confirmPassword)
    throw new BadRequestError("Password no match, pleas check again!");

  const result = await User.create({
    name,
    email,
    organizer: req.user.organizer,
    password,
    role,
  });

  return result;
};

const getAllUsers = async () => {
  const result = await User.find()
    .select("name email organizer role")
    .populate({ path: "organizer", model: "Organizer", select: "organizer" });

  return result;
};

const getOneUser = async (req) => {
  const { id } = req.params;
  const result = await User.findOne({ _id: id }).select(
    "-__v -createdAt -updatedAt -password"
  );

  if (!result) throw new NotFoundError(`No admin with id ${id}`);

  return result;
};

const getOneAndRemoveUser = async (req) => {
  const { id } = req.params;
  const result = await User.findOneAndRemove({ _id: id });

  if (!result) throw new NotFoundError(`No admin with id ${id}`);

  return result;
};

module.exports = {
  createUser,
  getAllUsers,
  getAllOrganizers,
  getOneUser,
  updateUser,
  getOneAndRemoveUser,
};
