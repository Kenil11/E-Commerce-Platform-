const mongoose = require("mongoose");
const { GlobalConstant } = require("../../constant/dbConstant");
const { userTypesConstants } = require("./constants");

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
    },
    profilePicture: {
      type: String,
    },
    userType: {
      type: String,
      enum: userTypesConstants,
      default: "Customer",
    },
    manager: {
      type: mongoose.Schema.Types.ObjectId,
      ref: GlobalConstant.USER,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model(GlobalConstant.USER, userSchema);
