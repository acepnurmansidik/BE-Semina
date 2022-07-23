const { StatusCodes } = require("http-status-codes");
const {
  createOrganizer,
  createUser,
} = require("../../../services/mongo/users");

const createCMSOrganizer = async (req, res, next) => {
  try {
    const result = await createOrganizer(req);

    res.status(StatusCodes.CREATED).json({ data: result });
  } catch (err) {
    next(err);
  }
};

const createCMUser = async (req, res, next) => {
  try {
    const result = await createUser(req);

    res.status(StatusCodes.CREATED).json({ data: result });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createCMSOrganizer,
  createCMUser,
};
