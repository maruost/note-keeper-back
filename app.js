require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const { errors } = require("celebrate");
const helmet = require("helmet");
const cors = require("cors");

const { requestLogger, errorLogger } = require("./middlewares/logger");
const { corsOptions } = require("./middlewares/cors");
const limiter = require("./helpers/rate-limiter");
const mainRouter = require("./routes/index");
const { errMessages } = require("./data/messages");
const NotFoundError = require("./helpers/not-found-error");
const { mongoAdress } = require("./helpers/config");

const { PORT = 8000, NODE_ENV, DATA_URI } = process.env;
const app = express();

mongoose.connect(NODE_ENV === "production" ? DATA_URI : mongoAdress, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

app.use("*", cors(corsOptions));
app.use(helmet());
app.use(limiter);
app.use(bodyParser.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(requestLogger);

app.use("/", mainRouter);

app.use((req, res) => {
  throw new NotFoundError(errMessages.resource);
});

app.use(errors());

app.use((err, req, res, next) => {
  let { statusCode = 500, message } = err;

  if (err.name.includes("MongoError")) {
    statusCode = 409;
    message = errMessages.duplicate;
  }

  res.status(statusCode).send({
    message: statusCode === 500 ? message : message,
  });
});

app.use(errors());

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
