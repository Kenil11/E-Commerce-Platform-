const env = require("../constant/env");
const jwt = require("jsonwebtoken");

const createToken = (data) =>
  jwt.sign(data, env.JWT_SECRET, { expiresIn: "1h" });

const verifyToken = (token) => jwt.verify(token, env.JWT_SECRET);

module.exports = {
  createToken,
  verifyToken,
};
