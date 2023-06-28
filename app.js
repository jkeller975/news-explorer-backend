const express = require("express");
const mongoose = require("mongoose");
const { errors } = require("celebrate");
const helmet = require("helmet");
const cors = require("cors");
const router = require("./routes/index");
const { requestLogger, errorLogger } = require("./middleware/logger");
const { limiter, DB_ADDRESS } = require("./utils/constants");
const { ERROR_MESSAGES } = require("./utils/constants");
const errorHandler = require("./middleware/error-handler");
const NotFoundError = require("./errors/not-found-error");

const { PORT = 3001 } = process.env;

const app = express();

mongoose.set("strictQuery", false); // Added due to DeprecationWarning being thrown
mongoose.connect(DB_ADDRESS, {
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
app.use(errorLogger);
app.use(errors());
app.use((req, res, next) => {
  next(new NotFoundError(ERROR_MESSAGES.notFound));
});
app.use(errorHandler);
app.use(limiter);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App listening at port ${PORT}`);
});
