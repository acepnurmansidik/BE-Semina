const { StatusCodes } = require("http-status-codes");
const {
  createUser,
  getAllUsers,
  getAllOrganizers,
  getOneUser,
  updateUser,
  getOneAndRemoveUser,
} = require("../../../services/mongo/users");

const getCMSUsers = async (req, res, next) => {
  try {
    const result = await getAllUsers(req);

    res.status(StatusCodes.OK).json({ data: result });
  } catch (err) {
    next(err);
  }
};

const getAllCMSOrganizers = async (req, res, next) => {
  try {
    const result = await getAllOrganizers();

    res.status(StatusCodes.OK).json({ data: result });
  } catch (err) {
    next(err);
  }
};

const createCMSUser = async (req, res, next) => {
  try {
    const result = await createUser(req);

    res.status(StatusCodes.CREATED).json({ data: result });
  } catch (err) {
    next(err);
  }
};

const getOneCMSUser = async (req, res, next) => {
  try {
    const result = await getOneUser(req);

    res.status(StatusCodes.OK).json({ data: result });
  } catch (err) {
    next(err);
  }
};

const updateCMSUser = async (req, res, next) => {
  try {
    const result = await updateUser(req);

    res.status(StatusCodes.OK).json({ data: result });
  } catch (err) {
    next(err);
  }
};

const deleteCMSUser = async (req, res, next) => {
  try {
    const result = await getOneAndRemoveUser(req);

    res.status(StatusCodes.OK).json({ data: result });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createCMSUser,
  getCMSUsers,
  getAllCMSOrganizers,
  getOneCMSUser,
  updateCMSUser,
  deleteCMSUser,
};
