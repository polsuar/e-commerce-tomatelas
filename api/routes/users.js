const express = require("express");
const userRouter = express.Router();
const User = require("../models/UsersModel");
// const auth = require("../config/auth");

userRouter.get("/prueba", (req, res) => {
  res.status(200).send("hola");
});

userRouter.get("/", (req, res, next) => {
  console.log("entre a user");
  User.findAll()
    .then((users) => {
      res.status(200).send(users);
    })
    .catch(next);
});

userRouter.get("/:id", (req, res, next) => {
  User.findOne({
    where: { id: req.params.id },
  })
    .then((user) => {
      if (!user) res.status(404);
      res.send(user);
    })
    .catch(next);
});

userRouter.put("/:id", (req, res, next) => {

  User.update(req.body, {
    where: { id: req.params.id },
    returning: true,
  })
    .then(([noData, [data]]) =>
      res.json({
        message: "Updated successfully",
        user: data,
      })
    )
    .catch(next);
});


userRouter.delete("/:id", (req, res, next) => {
  const { id } = req.params;
  User.destroy({
    where: { id },
  })
    .then(res.sendStatus(202))
    .catch(next);
})


module.exports = userRouter;
