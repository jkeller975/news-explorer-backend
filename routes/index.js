const router = require("express").Router();
const { celebrate, Joi } = require("celebrate");

const validator = require("validator");
const signin = require("./signin");
const signup = require("./signup");
const auth = require("../middleware/auth");

const articlesRouter = require("./articles");
const usersRouter = require("./users");

// const notFoundRouter = require('./notFoundRoute');

function validateEmail(string) {
  if (!validator.isEmail(string)) {
    throw new Error("Invalid Email");
  }
  return string;
}

router.use(
  "/signin",
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().custom(validateEmail),
      password: Joi.string().required(),
    }),
  }),
  signin
);
router.use(
  "/signup",
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().custom(validateEmail),
      password: Joi.string().required(),
      name: Joi.string().required().min(2).max(30),
    }),
  }),
  signup
);

router.use(auth);

router.use("/articles", articlesRouter);
router.use("/users", usersRouter);

// router.use('/*', notFoundRouter);

module.exports = router;
