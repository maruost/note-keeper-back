const mainRouter = require("express").Router();
const { celebrate, Joi } = require("celebrate");

const { createUser, login } = require("../controllers/users");
const auth = require("../middlewares/auth");
const users = require("./users");
const notes = require("./notes");

// Authorization route
mainRouter.post(
  "/signin",
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required(),
      password: Joi.string().required(),
    }),
  }),
  login
);

// Registration route
mainRouter.post(
  "/signup",
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required().trim().min(8),
      name: Joi.string().required().min(2).max(30),
    }),
  }),
  createUser
);

// Users info route
mainRouter.use("/users", auth, users);

// Articles info route
mainRouter.use("/notes", auth, notes);

module.exports = mainRouter;
