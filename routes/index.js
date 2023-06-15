const router = require("express").Router();
// const {
//   validateUserBody,
//   validateAuthentication,
// } = require('../middleware/validation');
const { login, createUser } = require("../controllers/users");
// const auth = require("../middleware/auth");

// const articlesRouter = require('./articles');
const usersRouter = require("./users");
const signin = require("./signin");
const signup = require("./signup");
// const notFoundRouter = require('./notFoundRoute');

router.post("/", createUser);
router.post("/", login);

// router.use(auth);

// router.use('/articles', articlesRouter);
router.use("/", usersRouter);
router.use("/", signin);
router.use("/", signup);
// router.use('/*', notFoundRouter);

module.exports = router;
