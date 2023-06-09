const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/user");
const BadRequestError = require("../errors/bad-request-error");
const UnauthorizedError = require("../errors/unauthorized-error");
const ConflictError = require("../errors/conflict-error");
const { STATUS_CODES, ERROR_MESSAGES } = require("../utils/constants");
require("dotenv").config();

const { NODE_ENV, JWT_SECRET } = process.env;

const getCurrentUser = (req, res, next) => {
  const { _id: userId } = req.user;
  User.findById(userId)

    .then((user) => {
      res.status(STATUS_CODES.ok).send({ data: user });
    })
    .catch((err) => {
      if (err.name === "CastError") {
        return next(new BadRequestError(ERROR_MESSAGES.userBadRequest));
      }
      return next(err);
    });
};

const createUser = (req, res, next) => {
  const { name, email, password } = req.body;
  bcrypt
    .hash(password, 10)
    .then((hash) => User.create({ name, email, password: hash }))
    .then((user) => {
      res.status(STATUS_CODES.created).send({
        data: {
          name: user.name,
          email: user.email,
        },
      });
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        const errors = Object.keys(err.errors);
        const isMultiple = errors.length > 1;
        const lastError = errors.pop();

        return next(
          new BadRequestError(
            `Invalid ${
              isMultiple
                ? `${errors.join(", ")}${
                    errors.length > 1 ? "," : ""
                  } and ${lastError}`
                : lastError
            } input${isMultiple ? "s" : ""}`
          )
        );
      }
      if (err.code === 11000) {
        return next(new ConflictError(ERROR_MESSAGES.signup));
      }
      return next(err);
    });
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === "production" ? JWT_SECRET : "dev",
        {
          expiresIn: "7d",
        }
      );
      res.send({ data: user.toJSON(), token });
    })
    .catch(() => {
      next(new UnauthorizedError(ERROR_MESSAGES.unauthorized));
    });
};

module.exports = {
  getCurrentUser,
  createUser,
  login,
};
