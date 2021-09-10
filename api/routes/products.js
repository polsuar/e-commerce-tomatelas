const express = require("express");
const productsRouter = express.Router();
const Product = require("../models/ProductsModel");

productsRouter.get("/", (req, res, next) => {
  Product.findAll()
    .then((products) => {
      res.send(products);
    })
    .catch(next);
});

productsRouter.get("/:id", (req, res, next) => {
  Product.findOne({
    where: { id: req.params.id },
  })
    .then((product) => {
      if (!product) res.status(404);
      res.send(product);
    })
    .catch(next);
});

productsRouter.post("/", (req, res, next) => {
  const { name, volume, category, brand, stock, img, description } = req.body;

  Product.create(req.body)
    .then((data) => {
      res.status(201).json({
        message: "Created successfully",
        product: data,
      });
    })
    .catch(next);
});

productsRouter.put("/:id", (req, res, next) => {
  const { name, volume, category, brand, stock, img, description } = req.body;

  Product.update(req.body, {
    where: { id: req.params.id },
    returning: true,
  })
    .then(([noData, [data]]) =>
      res.json({
        message: "Updated successfully",
        product: data,
      })
    )
    .catch(next);
});

productsRouter.delete("/:id", (req, res, next) => {
  const { id } = req.params;
  Product.destroy({
    where: { id },
  })
    .then(res.sendStatus(202))
    .catch(next);
});

/* productsRouter.get("/category/:id", (req, res, next) => {
  const id = req.params.id;
  Categories.findAll({
    where: {
      category_id: id,
    },
    include: [
      {
        model: Product,
        required: true,
      },
    ],
  }).then((prod) => {
    res.send(prod);
  });
}); */

module.exports = productsRouter;
