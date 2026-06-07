const express = require("express");
const controller = require("./controller");

const routes = express.Router();

routes.post("/login", controller.login);

routes.post("/register", controller.register);

routes.post("/logout", controller.logout);

routes.post("/forget-password", controller.forgetPassword);

routes.post("/reset-password", controller.resetPassword);

module.exports = routes;
