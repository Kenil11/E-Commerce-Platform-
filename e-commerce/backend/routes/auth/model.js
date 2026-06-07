const mongoose = require("mongoose");
const { GlobalConstant } = require("../../constant/dbConstant");

const responseSchema = new mongoose.Schema(
  {
    httpStatus: {
      type: Number,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    payload: {
      type: mongoose.Schema.Types.Mixed,
      required: true,
    },
    device: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
  },
  { _id: false },
);

const authSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ["Login", "Register"],
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  ip: {
    type: String,
    required: true,
  },
  userAgent: {
    type: String,
    required: true,
  },
  response: {
    type: responseSchema,
    required: true,
  },
});

module.exports = mongoose.model(GlobalConstant.AUTH, authSchema);
