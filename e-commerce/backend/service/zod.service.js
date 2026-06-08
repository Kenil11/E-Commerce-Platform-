const { z } = require("zod");

//1. Object MongoId
const objectId = z
  .string()
  .regex(/^[0-9a-fA-F]{24}$/, "Invalid MongoDB ObjectId");

//2. Password

const password = z
  .string()
  .min(8, "Password should be of min 8 character")
  .max(100);

module.exports = {
  objectId,
  password,
};
