const express = require("express");
const favoritesRoute = express.Router();
const Product = require("../models/ProductsModel");
const User = require("../models/UsersModel");

require("../models/index");

favoritesRoute.get("/:id", async (req, res) => {
  const user = await User.findOne({
    where: { id: req.params.id },
  });
  const products = await user.getProducts();
  res.send(products);
});
/*
router.put("/favorites", (req, res) => {
    const { userId, flightId } = req.query;
    Users.findByPk(userId)
      .then((user) => user.addFavorite(flightId))
      .then(() => res.sendStatus(200))
      .catch(() => res.status(500).send("Already added"));
  });
  */

favoritesRoute.put("/:id", async (req, res) => {
  const { product } = req.query; // http://localhost:3001/api/favorites/4?product=2

  const user = await User.findOne({
    where: { id: req.params.id },
  });
  console.log(user);
  console.log("PRODUCT", product);
  const favorite = await user.addProducto(product);
  res.send(favorite);
});

module.exports = favoritesRoute;
