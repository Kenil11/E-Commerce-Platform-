const md5 = require("md5");

const hashPassword = (password) => md5(password);

const verifyPassword = (password, hashedPassword) => md5(password) === hashedPassword;

module.exports = { hashPassword, verifyPassword };