const { error, info, log, warn } = require("./loggerBuilder");

const SUCCESS = "success";
const ERROR = "error";
const VALIDATION_ERROR = "validation_error";

const responseSuccess = (message, data) => {
  info(message);
  return {
    response: true,
    result: {
      type: SUCCESS,
      message,
      data,
    },
  };
};

const responseError = (message) => {
  error(message);
  return {
    response: false,
    result: {
      type: ERROR,
      message,
      data: null,
    },
  };
};

const responseValidationError = (message) => {
  warn(message);
  return {
    response: false,
    result: {
      type: VALIDATION_ERROR,
      message,
      data: null,
    },
  };
};

module.exports = { responseSuccess, responseError, responseValidationError };
