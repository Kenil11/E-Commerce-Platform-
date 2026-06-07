const { Router } = require("express");

const router = Router();

const users = require("./users");
router.use("/users", users.route);

const auth = require("./auth");
router.use("/auth", auth.route);

module.exports = router;
