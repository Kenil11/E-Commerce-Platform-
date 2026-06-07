const morgan = require("morgan");

morgan((tokens, req, res) => {
  return JSON.stringify({
    timestamp: new Date().toISOString(),
    method: tokens.method(req, res),
    url: tokens.url(req, res),
    status: Number(tokens.status(req, res)),
    responseTime: `${tokens["response-time"](req, res)} ms`,
    responseSize: tokens.res(req, res, "content-length"),
    requestSize: req.headers["content-length"] || 0,
    ip: tokens["remote-addr"](req, res),
    userAgent: req.headers["user-agent"],
  });
});

exports.morganMiddleware = morgan;