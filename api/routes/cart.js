const express = require("express");
const cartRoute = express.Router();
const Cart = require("../models/CartModel");
const User = require("../models/UsersModel");

cartRoute.get("/:id", async (req, res) => {
  let cart = await Cart.findOne({ where: { userId: req.params.id } });
  if (!cart) cart = await Cart.create({ userId: req.params.id });
  res.status(200).send(cart);
});

cartRoute.put("/:id/add", async (req, res) => {
  const products = req.body;
  const cart = await Cart.findOne({ where: { userId: req.params.id } });
  let change;
  cart.cart_items !== null
    ? (change = await Cart.update(
        { cart_items: [...cart.cart_items, ...products] },
        { where: { id: cart.id }, returning: true }
      ))
    : (change = await Cart.update(
        { cart_items: products },
        { where: { id: cart.id }, returning: true }
      ));

  res.status(200).send(change[1]);
});

cartRoute.put("/:id/put", async (req, res) => {
  const [product, quantity] = req.body;
  const cart = await Cart.findOne({ where: { userId: req.params.id } });
  const change = cart.cart_items.map((item) => {
    if (item.id === product.id) item.quantity = quantity;
    return item;
  });

  const update = await Cart.update(
    { cart_items: change },
    { where: { id: cart.id }, returning: true, plain: true }
  );
  console.log(update);
  res.sendStatus(200);
});

cartRoute.delete("/:id/delete", (req, res) => {
  Cart.destroy({ where: { userId: req.params.id } }).then(() => {
    Cart.create({ where: { userId: req.params.id } });
  });

  res.sendStatus(200);
});

module.exports = cartRoute;
