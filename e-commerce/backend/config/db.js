const mongoose = require("mongoose");
const env = require("../constant/env");
const { info, error } = require("../service/loggerBuilder");

const connectDB = async () => {
  try {
    await mongoose.connect(env.MONGO_URI);
    info("MongoDB connected successfully");
  } catch (err) {
    error(`MongoDB connection error: ${err.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
