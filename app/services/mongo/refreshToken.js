const UserRefreshToken = require("../../api/v1/userRefreshToken/model");
const User = require("../../api/v1/users/model");
const {
  isTokenValidRefreshToken,
  createJWT,
  createTokenUser,
} = require("../../utils");
const Users = require("../../api/v1/users/model");
const { BadRequestError } = require("../../errors");

const createUserRefreshToken = async (payload) => {
  const result = await UserRefreshToken.create(payload);

  return result;
};

const getUserRefreshToken = async (req) => {
  const { refreshToken, email } = req.params;
  const result = await UserRefreshToken.findOne({ refreshToken });

  const payload = isTokenValidRefreshToken({ token: result.refreshToken });

  if (email !== payload.email) {
    throw new BadRequestError("Email not valid!");
  }

  const userCheck = await Users.findOne({ email: payload.email });

  const token = createJWT({ payload: createTokenUser(userCheck) });

  return token;
};

module.exports = { createUserRefreshToken, getUserRefreshToken };
