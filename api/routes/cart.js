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
  // el producto ya debe tener la quantity seteada
  const products = req.body;
  let cart = await Cart.findOne({ where: { userId: req.params.id } });
  const userCart = cart.cart_items;
  let change;

  change = products.length
    ? await Cart.update(
        { cart_items: [...userCart, ...products] },
        { where: { id: cart.id }, returning: true }
      )
    : await Cart.update(
        { cart_items: [...userCart, products] },
        { where: { id: cart.id }, returning: true }
      );

  res.status(200).send(change[1]);
});

cartRoute.put("/:id/put", async (req, res) => {
  const { productId, quantity } = req.body;
  const cart = await Cart.findOne({ where: { userId: req.params.id } });
  const change = cart.cart_items.map((item) => {
    if (item.id === productId) item.quantity = quantity;
    return item;
  });

  const update = await Cart.update(
    { cart_items: change },
    { where: { id: cart.id }, returning: true, plain: true }
  );
  res.status(200).send(update[1]);
});

cartRoute.delete("/:id/clear", (req, res) => {
  Cart.destroy({ where: { userId: req.params.id } }).then(() => {
    Cart.create({ where: { userId: req.params.id } });
  });

  res.sendStatus(200);
});

cartRoute.put("/:id/delete", async (req, res) => {
  const { productId } = req.body;
  const cart = await Cart.findOne({ where: { userId: req.params.id } });
  const change = cart.cart_items.filter((item) => item.id !== productId);

  const update = await Cart.update(
    { cart_items: change },
    { where: { id: cart.id }, returning: true, plain: true }
  );
  res.status(200).send(update[1]);
});

module.exports = cartRoute;
