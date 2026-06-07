const asyncHandler = require("express-async-handler");
const model = require("./model");

const login = asyncHandler(async (req, res) => {});

const register = asyncHandler(async (req, res) => {});

const logout = asyncHandler(async (req, res) => {});

const forgetPassword = asyncHandler(async (req, res) => {});

const resetPassword = asyncHandler(async (req, res) => {});

module.exports = {
  login,
  register,
  logout,
  forgetPassword,
  resetPassword,
};
