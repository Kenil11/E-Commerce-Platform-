const env = {
  PORT: process.env.PORT,
  MONGO_URI: process.env.MONGO_URI,
  JWT_SECRET: process.env.JWT_SECRET,
  STATIC_FILES_PATH: process.env.STATIC_FILES_PATH,
};

module.exports = env;
