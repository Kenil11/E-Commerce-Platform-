const asyncHandler = require("express-async-handler");
const model = require("./model");
const { hashPassword, comparePassword } = require("../../service/hashService");
const {
  responseSuccess,
  responseError,
  responseValidationError,
} = require("../../service/responseBuilder");

exports.getUsers = asyncHandler(async (req, res) => {
  const query = req.query;

  const users = await model.find({ ...query });

  if (!users || users.length === 0) {
    const error = new Error("No users found");
    error.statusCode = 204;
    throw error;
  }

  return res.status(200).json(responseSuccess("Found users", users));
});

exports.createUser = asyncHandler(async (req, res) => {
  const reqObj = req.body;

  const existingUser = await model.findOne({ email: reqObj.email });

  if (existingUser) {
    const error = new Error("Email already exists");
    error.statusCode = 400;
    throw error;
  }

  const hashedPassword = await hashPassword(reqObj.password);

  const newUser = await model.create({
    ...reqObj,
    password: hashedPassword,
  });

  return res
    .status(201)
    .json(responseSuccess("User created successfully", newUser));
});

exports.getUserById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const user = await model.findById(id);

  if (!user) {
    const error = new Error("User not found");
    error.statusCode = 204;
    throw error;
  }

  return res.status(200).json(responseSuccess("User found", user));
});

exports.updateUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const reqObj = req.body;

  const user = await model.findById(id);

  if (!user) {
    const error = new Error("User not found");
    error.statusCode = 204;
    throw error;
  }

  if (reqObj.password) {
    reqObj.password = await hashPassword(reqObj.password);
  }

  const updatedUser = await model.findByIdAndUpdate(id, reqObj, { new: true });

  return res
    .status(200)
    .json(responseSuccess("User updated successfully", updatedUser));
});

exports.deleteUser = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const user = await model.findById(id);

  if (!user) {
    const error = new Error("User not found");
    error.statusCode = 204;
    throw error;
  }

  await model.findByIdAndDelete(id);

  return res
    .status(200)
    .json(responseSuccess("User deleted successfully", null));
});
