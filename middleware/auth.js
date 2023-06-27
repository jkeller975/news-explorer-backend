const jwt = require("jsonwebtoken");
const UnauthorizedError = require("../errors/unauthorized-error");
const { DEV_KEY } = require("../utils/constants");
require("dotenv").config();

const { NODE_ENV, JWT_SECRET } = process.env;

const auth = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith("Bearer ")) {
    return next(new UnauthorizedError("Authorization required"));
  }

  const token = authorization.replace("Bearer ", "");
  let payload;
  try {
    payload = jwt.verify(
      token,
      NODE_ENV === "production" ? JWT_SECRET : DEV_KEY
    );
  } catch (e) {
    return next(new UnauthorizedError("Authorization required"));
  }
  req.user = payload;
  return next();
};

module.exports = auth;

// const jwt = require("jsonwebtoken");
// const UnauthorizedError = require("../errors/unauthorized-error");
// require("dotenv").config();

// const { NODE_ENV, JWT_SECRET } = process.env;

// const auth = (req, res, next) => {
//   const { authorization } = req.headers;
//   if (!authorization || !authorization.startsWith("Bearer ")) {
//     return next(new UnauthorizedError("Authorization requiredd"));
//   }

//   const token = authorization.replace("Bearer ", "");
//   let payload;
//   try {
//     payload = jwt.verify(token, NODE_ENV === "production" ? JWT_SECRET : "dev");
//   } catch (e) {
//     return next(new UnauthorizedError("Authorization required"));
//   }
//   req.user = payload;
//   return next();
// };

// module.exports = auth;
