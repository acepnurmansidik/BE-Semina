const { StatusCodes } = require("http-status-codes");
const { signin } = require("../../../services/mongo/auth");

const signinCms = async (req, res, next) => {
  try {
    const { role, token } = await signin(req);

    res.status(StatusCodes.OK).json({ data: { role, token } });
  } catch (err) {
    next(err);
  }
};

module.exports = { signinCms };
