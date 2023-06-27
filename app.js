const express = require("express");
const mongoose = require("mongoose");
const { errors } = require("celebrate");
const helmet = require("helmet");
const cors = require("cors");
const router = require("./routes/index");
const { requestLogger, errorLogger } = require("./middleware/logger");
const { limiter } = require("./utils/constants");
const NotFoundError = require("./errors/not-found-error");

const { PORT = 3001, DATABASE_ADDRESS } = process.env;

const app = express();

mongoose.set("strictQuery", false); // Added due to DeprecationWarning being thrown
mongoose.connect(DATABASE_ADDRESS, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(express.json());
app.use(cors());
app.options("*", cors());
app.use(helmet());
app.use(requestLogger);
app.get("/crash-test", () => {
  setTimeout(() => {
    throw new Error("Server will crash now");
  }, 0);
});
app.use(router);
app.use(errors());
app.use((req, res, next) => {
  next(new NotFoundError("Not Found"));
});
app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;
  res.status(statusCode).send({
    message: statusCode === 500 ? "An error occurred on the server" : message,
  });
});
app.use(limiter);
app.use(errorLogger);
app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App listening at port ${PORT}`);
});
