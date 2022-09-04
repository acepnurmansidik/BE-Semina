const UserRefreshToken = require("../../api/v1/userRefreshToken/model");
const User = require("../../api/v1/users/model");
const {
  isTokenValidRefreshToken,
  createJWT,
  createTokenUser,
} = require("../../utils");
const Users = require("../../api/v1/users/model");
const { BadRequestError, NotFoundError } = require("../../errors");

const createUserRefreshToken = async (payload) => {
  const result = await UserRefreshToken.create(payload);

  return result;
};

const getUserRefreshToken = async (req) => {
  const { refreshToken } = req.params;
  const result = await UserRefreshToken.findOne({ refreshToken });

  if (!result) throw new NotFoundError("Refresh token not valid!");

  const payload = isTokenValidRefreshToken({ token: result.refreshToken });

  const userCheck = await Users.findOne({ email: payload.email });

  const token = createJWT({ payload: createTokenUser(userCheck) });

  return token;
};

module.exports = { createUserRefreshToken, getUserRefreshToken };
