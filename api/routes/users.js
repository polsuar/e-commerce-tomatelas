const express = require("express");
const userRouter = express.Router();
const models = require('../../db/models');
const User = models.UsersModel;
const auth = require("../config/auth");


userRouter.get("/users", auth,(req, res, next) => {
  User.findAll()
    .then((users) => {
      res.status(200).send(users)
    })
    .catch(next);
});


userRouter.get("/users/:id", auth,(req,res,next)=>{
  User.findOne({
    where:{id:req.params.id}
  })
    .then((user) => {
      if(!user) res.status(404)
      res.send(user)
    }
      )
    .catch(next);
})

userRouter.put("/users/:id", (req, res, next) => {
  User.update(req.body, {
    where: { id : req.params.id },
    returning: true,
  })
    .then(([noData,[data]]) => 
    res.json(
      {
        message: 'Updated successfully',
        article: data
      }
    ))
  .catch(next);
})

module.exports = userRouter;
