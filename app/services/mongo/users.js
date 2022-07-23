const User = require("../../api/v1/users/model");
const Organizer = require("../../api/v1/organizer/model");
const { BadRequestError } = require("../../errors");

const createOrganizer = async (req) => {
  const { organizer, email, name, password, confirmPassword, role } = req.body;

  if (password !== confirmPassword) {
    throw new BadRequestError("Password no macth!");
  }

  const result = await Organizer.create({ organizer });

  const user = await User.create({
    email,
    name,
    password,
    role,
    confirmPassword,
    organizer: result._id,
  });

  delete user._doc.password;

  return user;
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

module.exports = { createOrganizer, createUser };
