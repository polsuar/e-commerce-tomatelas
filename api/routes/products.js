const express = require("express");
const productsRouter = express.Router();

productsRouter.get("/", (req, res) => {
  console.log("productos");
});

module.exports = productsRouter;
