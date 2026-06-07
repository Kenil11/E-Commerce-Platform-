const morgan = require("morgan");
const chalk = require("chalk").default;

const getStatusColor = (status) => {
  if (status >= 500) return chalk.red(status);
  if (status >= 400) return chalk.yellow(status);
  if (status >= 300) return chalk.cyan(status);
  if (status >= 200) return chalk.green(status);
  return chalk.white(status);
};

const morganMiddleware = morgan((tokens, req, res) => {
  const status = Number(tokens.status(req, res));

  return [
    chalk.gray(new Date().toLocaleTimeString()),
    chalk.blue(tokens.method(req, res)),
    chalk.white(tokens.url(req, res)),
    getStatusColor(status),
    chalk.magenta(`${tokens["response-time"](req, res)}ms`),
    chalk.cyan(`${tokens.res(req, res, "content-length") || 0}B`),
    chalk.yellow(tokens["remote-addr"](req, res)),
  ].join(" | ");
});

module.exports = { morganMiddleware };
