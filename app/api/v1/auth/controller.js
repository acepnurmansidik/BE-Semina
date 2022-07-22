const { StatusCodes } = require("http-status-codes");
const { signin } = require("../../../services/mongo/auth");

const signinCms = async (req, res, next) => {
  try {
    const result = await signin(req);

    res.status(StatusCodes.OK).json({ data: { token: result } });
  } catch (err) {
    next(err);
  }
};

module.exports = { signinCms };
