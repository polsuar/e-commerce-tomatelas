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

categoriesRoute.put("/add/:name", (req, res) => {
  Category.create({ category_name: req.params.name }).then((category) =>
    res.status(200).send(category)
  );
});

categoriesRoute.delete("/:id", (req, res) => {
  Category.destroy({ where: { category_id: req.params.id } }).then(
    (deleteCategory) => res.status(200).send(deleteCategory)
  );
});

categoriesRoute.put("/:id", (req, res) => {
  Category.update(
    { category_name: req.body },
    { where: { category_id: req.params.id }, returning: true, plain: true }
  ).then((category) => res.status(200).send(category[1]));
});

module.exports = categoriesRoute;
