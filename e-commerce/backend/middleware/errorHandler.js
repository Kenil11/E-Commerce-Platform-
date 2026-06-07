const {
  responseError,
  responseSuccess,
} = require("../service/response.service");

const errorHandler = (err, req, res, next) => {
  if (err.statusCode === 404) {
    return res
      .status(err.statusCode)
      .json(responseSuccess(err.message || "Not Found", null));
  }

  return res
    .status(err.statusCode || 500)
    .json(responseError(err.message || "Internal Server Error"));
};

module.exports = errorHandler;
