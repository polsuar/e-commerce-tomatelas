const express = require("express");
const categoriesRoute = express.Router();
const Product = require("../models/ProductsModel");
const Category = require("../models/CategoryModel");
const { Op } = require("sequelize");
require("../models/index");

categoriesRoute.get("/", (req, res) => {
  Category.findAll()
    .then((categories) => res.status(200).send(categories))
    .catch((err) => res.status(400).send(err));
});
categoriesRoute.get("/:id", async (req, res) => {
  const category = await Category.findOne({
    where: { category_id: req.params.id },
  });
  const products = await category.getProducts();
  res.send(products);
});

module.exports = categoriesRoute;
