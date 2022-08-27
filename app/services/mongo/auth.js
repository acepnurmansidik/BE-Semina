const Users = require("../../api/v1/users/model");
const { BadRequestError, UnauthorizedError } = require("../../errors");
const { createTokenUser, createJWT, createRefreshJWT } = require("../../utils");
const { createUserRefreshToken } = require("./refreshToken");

const signin = async (req) => {
  const { email, password } = req.body;

  // check email & password from req.body
  if (!email || !password)
    throw new BadRequestError("Please provide email and password!");

  // search email in database
  const result = await Users.findOne({ email });

  // show error authorized, if not registered
  if (!result) throw new UnauthorizedError("Invalid Credentials!");

  // compare password from input user with in database
  const isPasswordCorrects = await result.comparePassword(password);
  if (!isPasswordCorrects) throw new UnauthorizedError("Invalid Credentials");

  // create token
  const token = await createJWT({ payload: createTokenUser(result) });

  const refreshToken = createRefreshJWT({ payload: createTokenUser(result) });
  await createUserRefreshToken({
    refreshToken,
    user: result._id,
  });

  return { role: result.role, email: result.email, token, refreshToken };
};

module.exports = { signin };
