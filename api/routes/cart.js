const express = require("express");
const cartRoute = express.Router();
const Cart = require("../models/CartModel");

cartRoute.get("/:id", (req, res) => {
  Cart.findOne({ where: { userId: req.params.id } }).then((cart) =>
    res.status(200).send(cart)
  );
});

cartRoute.put("/:id/add", async (req, res) => {
  const products = req.body;
  const cart = await Cart.findOne({ where: { userId: req.params.id } });
  console.log(products, cart);

  const change = await Cart.update(
    { cart_items: products },
    { where: { id: cart.id }, returning: true }
  );
  res.status(200).send(change);
});

cartRoute.put("/:id/put", async (req, res) => {
  const { product, quantity } = req.body;
  const cart = await Cart.findOne({ where: { userId: req.params.id } });
  console.log(products, cart);

  const change = await Cart.update(
    { cart_items: products },
    { where: { id: cart.id }, returning: true }
  );
  res.status(200).send(change);
});

module.exports = cartRoute;
