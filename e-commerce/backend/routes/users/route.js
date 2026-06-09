const express = require("express");
const controller = require("./controller");
const upload = require("../../middleware/upload");
const validator = require("../../middleware/validator");
const {
  createUserSchema,
  deleteUser,
  getOneUserSchema,
  updateUserSchema,
  getAllUsers,
} = require("./validator");

const routes = express.Router();

routes
  .route("/")
  .get(validator(getAllUsers), controller.getUsers)
  .post(
    upload.single("image"),
    validator(createUserSchema),
    controller.createUser,
  );

routes
  .route("/:id")
  .get(validator(getOneUserSchema), controller.getUserById)
  .put(
    upload.single("image"),
    validator(updateUserSchema),
    controller.updateUser,
  )
  .delete(validator(deleteUser), controller.deleteUser);

module.exports = routes;
