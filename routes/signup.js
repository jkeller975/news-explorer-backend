const router = require("express").Router();
const { createUser } = require("../controllers/users");
const { validateSignup } = require("../middleware/validator");

router.post("/", validateSignup, createUser);

module.exports = router;
