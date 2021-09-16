const express = require("express");
const orderRoute = express.Router();
const Order = require("../models/OrdersModel");

orderRoute.get("/", (req, res) => {
  console.log("entre");
  Order.findAll().then((order) => {
    res.status(200).send(order);
  });
});

orderRoute.get("/user/:id", (req, res) => {
  Order.findAll({
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
  Order.findAll({
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
  const { date, user, cart, precioFinal } = req.body;
  Order.create({
    user_id: user.id,
    userName: user.userName,
    products: cart,
    total_price: precioFinal,
  }).then(() => res.sendStatus(201));
});

orderRoute.put("/update/:id", (req, res) => {
  Order.update(
    { state: req.body.status },
    { where: { order_id: req.params.id } }
  )
    .then(() => res.sendStatus(202))
    .catch((error) => {
      res.status(404).send(error);
    });
});

orderRoute.delete("/delete/:id", (req, res) => {
  Order.destroy({ where: { order_id: req.params.id } })
    .then(() => res.sendStatus(202))
    .catch((error) => {
      res.status(404).send(error);
    });
});

module.exports = orderRoute;
