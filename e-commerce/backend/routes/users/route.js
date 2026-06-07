const express = require("express");
const controller = require("./controller");
const upload = require("../../middleware/upload");

const routes = express.Router();

routes
  .route("/")
  .post(upload.single("image"), controller.createUser)
  .get(controller.getUsers);

routes
  .route("/:id")
  .get(controller.getUserById)
  .put(upload.single("image"), controller.updateUser)
  .delete(controller.deleteUser);

module.exports = routes;
