const userRouter = require("express").Router();
const { findUser } = require("../controllers/users");

userRouter.get("/me", findUser);

module.exports = userRouter;
