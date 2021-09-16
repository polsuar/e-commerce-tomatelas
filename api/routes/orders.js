const express = require("express");
const orderProducts = require("orderProducts");
const Orders = require("../models/ProductsModel");

orderProducts.get("/", (req, res) => {
  Orders.findAll()
    .then((orders) => {
      console.log(orders);
      res.status(200).send(orders);
    })
    .catch((error) => {
      res.status(404).send(error);
    });
});

orderProducts.get("/user/:id", (req, res) => {
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

orderProducts.get("/number/:id", (req, res) => {
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

orderProducts.post("/add", (req, res) => {
  Orders.create(req.body).then(() => res.sendStatus(201));
});

orderProducts.put("/update/:id", (req, res) => {
  Orders.update(
    { state: req.body.status },
    { where: { order_id: req.params.id } }
  )
    .then(() => res.sendStatus(202))
    .catch((error) => {
      res.status(404).send(error);
    });
});

orderProducts.delete("/delete/:id", (req, res) => {
  Orders.destroy({ where: { order_id: req.params.id } })
    .then(() => res.sendStatus(202))
    .catch((error) => {
      res.status(404).send(error);
    });
});

module.exports = orderProducts;
