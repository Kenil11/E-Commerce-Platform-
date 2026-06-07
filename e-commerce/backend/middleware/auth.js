const log = require("../service/log.service");
const { verifyToken } = require("../service/jwt.service");
const { responseError } = require("../service/response.service");
const authModel = require("../routes/auth/model");

const auth = (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json(responseError("Unauthorized"));
    }

    const decoded = verifyToken(token);

    req.user = decoded;

    next();
  } catch (error) {
    log.error(error.message);
    return res.status(401).json(responseError("Unauthorized"));
  }
};
