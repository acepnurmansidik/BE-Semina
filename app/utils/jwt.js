const jwt = require("jsonwebtoken");
const { jwtSecret, jwtExpiration, jwtRefreshExpiration } = require("../config");

const createJWT = async ({ payload }) => {
  const token = jwt.sign(payload, jwtSecret, { expiresIn: jwtExpiration });

  return token;
};

const isTokenValid = ({ token }) => jwt.verify(token, jwtSecret);

module.exports = { createJWT, isTokenValid };
