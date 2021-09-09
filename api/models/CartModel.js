const S = require("sequelize");
const db = require("../db");

class Cart extends S.Model {}

Cart.init(
  {
    quantity: {
      type: S.INTEGER,
    },
  },
  { sequelize: db, modelName: "cart" }
);

//hooks

module.exports = Cart;
