const jwt = require("jsonwebtoken");
const { errMessages } = require("../data/messages");
const { jwtDev } = require("../helpers/config");

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports = (req, res, next) => {
  const token = req.cookies.jwt;

  if (!token) {
    return res.status(401).send({ message: errMessages.auth });
  }

  let payload;

  try {
    payload = jwt.verify(
      token,
      NODE_ENV === "production" ? JWT_SECRET : jwtDev
    );
  } catch (err) {
    return res.status(401).send({ message: errMessages.auth });
  }

  req.user = payload;

  next();
};
