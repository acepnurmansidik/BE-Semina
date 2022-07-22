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

module.exports = { createOrganizer };
