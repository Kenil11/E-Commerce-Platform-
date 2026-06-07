const Chalk = require("chalk").default;

const log = (message) => {
  console.log(Chalk.blue(`[LOG] ${message}`));
};

const error = (message) => {
  console.log(Chalk.red(`[ERROR] ${message}`));
};

const warn = (message) => {
  console.log(Chalk.yellow(`[WARN] ${message}`));
};

const info = (message) => {
  console.log(Chalk.green(`[INFO] ${message}`));
};

module.exports = { log, error, warn, info };
