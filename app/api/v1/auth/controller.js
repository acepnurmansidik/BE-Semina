const { StatusCodes } = require("http-status-codes");
const { signin } = require("../../../services/mongo/auth");

const signinCms = async (req, res, next) => {
  try {
    const { role, token, email, refreshToken } = await signin(req);

    res
      .status(StatusCodes.OK)
      .json({ data: { role, email, token, refreshToken } });
  } catch (err) {
    next(err);
  }
};

module.exports = { signinCms };
