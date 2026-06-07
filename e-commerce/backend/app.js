const dotenv = require("dotenv").config();
const env = require("./constant/env");
const express = require("express");
const hpp = require("hpp");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const xssClean = require("xss-clean");
const compression = require("compression");
const path = require("node:path");
const { morganMiddleware } = require("./utils/morganConfig");
const errorHandler = require("./middleware/errorHandler");
const connectDB = require("./config/db");
const router = require("./routes/index");

const app = express();

app.set("trust proxy", 1);
app.use(morganMiddleware);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(hpp());
app.use(mongoSanitize());
app.use(xssClean());
app.use(compression());

app.use(express.static(path.join(__dirname, "..", env.STATIC_FILES_PATH)));

app.use("/api/v1", router);

app.use((req, res, next) => {
  const error = new Error(`Route not found: ${req.originalUrl}`);
  error.statusCode = 404;
  next(error);
});

app.use(errorHandler);

app.listen(env.PORT, async () => {
  await connectDB();
  console.log("Server is running on port " + env.PORT);
});
