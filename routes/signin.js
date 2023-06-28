const router = require("express").Router();
const { login } = require("../controllers/users");
const { validateSignin } = require("../middleware/validator");

router.post("/", validateSignin, login);

module.exports = router;
