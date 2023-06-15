const usersRouter = require("express").Router();
const { getCurrentUser } = require("../controllers/users");

usersRouter.get("/me", getCurrentUser);

module.exports = usersRouter;
