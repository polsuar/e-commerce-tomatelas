const express = require("express");
const userRouter = express.Router();
const User = require("../models/UsersModel");

userRouter.get("/", (req, res) => {
  res.send(console.log("llegaste a users"));
});

module.exports = userRouter;
