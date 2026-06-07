const asyncHandler = require("express-async-handler");
const model = require("./model");
const userModel = require("../users/model");
const { createToken, verifyToken } = require("../../service/jwt.service");
const { hashPassword, verifyPassword } = require("../../service/hash.service");
const {
  responseSuccess,
  responseError,
  responseValidationError,
} = require("../../service/response.service");

const login = asyncHandler(async (req, res) => {
  const reqObj = req.body;

  const user = await userModel.findOne({ email: reqObj.email });

  if (!user) {
    const error = new Error("User not found");
    error.status = 400;
    throw error;
  }

  const isPasswordMatch = await verifyPassword(reqObj.password, user.password);

  if (!isPasswordMatch) {
    const error = new Error("Invalid password");
    error.status = 400;
    throw error;
  }

  const token = createToken({ id: user._id });

  const createAuth = await model.create({
    type: "Login",
    email: user.email,
    ip: reqObj.ip,
    userAgent: req.header["user-agent"],
    response: {
      httpStatus: 200,
      message: "Login Successful",
      payload: reqObj,
      device: req.header["device"],
      location: req.headers["location"],
    },
  });

  return res
    .status(200)
    .cookie("token", token, { httpOnly: true })
    .json(responseSuccess("Login successful", { token }));
});

const register = asyncHandler(async (req, res) => {
  const reqObj = req.body;

  const existingUser = await userModel.findOne({ email: reqObj.email });

  if (existingUser) {
    const error = new Error("Email already exists");
    error.status = 400;
    throw error;
  }

  const hashedPassword = await hashPassword(reqObj.password);

  const user = await userModel.create({
    ...reqObj,
    password: hashedPassword,
  });

  const createAuth = await model.create({
    type: "Register",
    email: user.email,
    ip: reqObj.ip,
    userAgent: req.header["user-agent"],
    response: {
      httpStatus: 200,
      message: "Login Successful",
      payload: reqObj,
      device: req.header["device"],
      location: req.headers["location"],
    },
  });

  return res
    .status(201)
    .json(responseSuccess("User registered successfully", user));
});

const logout = asyncHandler(async (req, res) => {
  const reqObj = req.body;

  const createAuth = await model.create({
    type: "Logout",
    email: user.email,
    ip: reqObj.ip,
    userAgent: req.header["user-agent"],
    response: {
      httpStatus: 200,
      message: "Login Successful",
      payload: reqObj,
      device: req.header["device"],
      location: req.headers["location"],
    },
  });

  return res
    .status(200)
    .clearCookie("token")
    .json(responseSuccess("Logout successful", null));
});

const forgetPassword = asyncHandler(async (req, res) => {});

const resetPassword = asyncHandler(async (req, res) => {});

module.exports = {
  login,
  register,
  logout,
  forgetPassword,
  resetPassword,
};
