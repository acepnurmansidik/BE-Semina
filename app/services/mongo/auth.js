const Users = require("../../api/v1/users/model");
const { BadRequestError, UnauthorizedError } = require("../../errors");
const { createJWT, createTokenUser } = require("../../utils");

const signin = async (req) => {
  const { email, password } = req.body;

  // check email & passwor dfrom req.body
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

  return { role: result.role, token };
};

module.exports = { signin };
