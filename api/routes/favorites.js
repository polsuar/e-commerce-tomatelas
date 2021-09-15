const express = require("express");
const favoritesRoute = express.Router();
const Product = require("../models/ProductsModel");
const User = require("../models/UsersModel");

require("../models/index");

// mostrar todos los favs de un usuario
favoritesRoute.get("/:id", async (req, res) => {
  const user = await User.findOne({
    where: { id: req.params.id },
  });
  const products = await user.getProducts();
  res.send(products);
});

// agregar favorito a usuario
favoritesRoute.post("/:id", (req, res) => {
  // http://localhost:3001/api/favorites/11?productId=2   // 11 es id de usuario
  const { productId } = req.query;

  Product.findOne({
    where: {
      id: productId,
    },
  })
    .then((product) => {
      console.log("PRODUCTO => ", product);
      User.findOne({
        where: { id: req.params.id },
      }).then((user) => user.addProduct(product));
    })
    .then(() => res.sendStatus(200))
    .catch(() => res.status(500).send("Already added"));
});

// remover favorito
favoritesRoute.delete("/:id", (req, res) => {
  // http://localhost:3001/api/favorites/11?productId=2   // 11 es id de usuario
  const { productId } = req.query;

  User.findOne({
    where: { id: req.params.id },
  })
    .then((user) => {
      console.log("USUARIO ===> ", user);
      user.removeProduct(productId);
    })
    .then(() => res.status(200).send(productId))
    .catch(() => res.status(500).send("Already added"));
});

// eliminar todos los favs de un usuario
favoritesRoute.delete("/all/:id", (req, res) => {
  User.findOne({
    where: { id: req.params.id },
  })
    .then((user) => {
      user.getProducts().then((products) => {
        user.removeProducts(products); // productos lista completa de productos
      });
    })
    .then(() => res.status(200).send([]))
    .catch(() => res.status(500).send("Error!"));
});

module.exports = favoritesRoute;
