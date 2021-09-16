const express = require("express");
const orderRoute = express.Router();
const Orders = require("../models/ProductsModel");

orderRoute.get("/", (req, res) => {
  Orders.findAll()
    .then((orders) => {
      console.log(orders);
      res.status(200).send(orders);
    })
    .catch((error) => {
      res.status(404).send(error);
    });
});

orderRoute.get("/user/:id", (req, res) => {
  Orders.findAll({
    where: {
      user_id: req.params.id,
    },
  })
    .then(() => res.sendStatus(200))
    .catch((error) => {
      res.status(404).send(error);
    });
});

orderRoute.get("/number/:id", (req, res) => {
  Orders.findAll({
    where: {
      order_id: req.params.id,
    },
  })
    .then(() => res.sendStatus(200))
    .catch((error) => {
      res.status(404).send(error);
    });
});

orderRoute.post("/add", (req, res) => {
  Orders.create(req.body).then(() => res.sendStatus(201));
});

orderRoute.put("/update/:id", (req, res) => {
  Orders.update(
    { state: req.body.status },
    { where: { order_id: req.params.id } }
  )
    .then(() => res.sendStatus(202))
    .catch((error) => {
      res.status(404).send(error);
    });
});

orderRoute.delete("/delete/:id", (req, res) => {
  Orders.destroy({ where: { order_id: req.params.id } })
    .then(() => res.sendStatus(202))
    .catch((error) => {
      res.status(404).send(error);
    });
});

module.exports = orderRoute;
