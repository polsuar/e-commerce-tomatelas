// const express = require("express");
// const categoriesRouter = express.Router();
// const Products = require('../models/ProductsModel')
// const Categories = require('../models/CategoriesModel');


// Categories.hasMany(Products, {
//   foreignKey: 'category_id'
// });

// categoriesRouter.get("/", (req, res, next) => {
//   Categories.findAll({
//     attributes: ['category_id', 'category_name'],
//     include: [{
//       model: Product,
//       required: true,
//       attributes:[]
//      }]
//   })
//     .then((categories) => {
//       res.send(categories)
//     })
//     .catch(next);
// });

// module.exports = categoriesRouter;