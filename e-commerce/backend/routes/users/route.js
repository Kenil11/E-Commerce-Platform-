const express = require("express");
const controller = require("./controller");

const routes = express.Router();

routes.route("/").post(controller.createUser).get(controller.getUsers);

routes
  .route("/:id")
  .get(controller.getUserById)
  .put(controller.updateUser)
  .delete(controller.deleteUser);

module.exports = routes;
