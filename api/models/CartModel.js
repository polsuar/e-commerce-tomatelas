const S = require("sequelize");
const db = require("../db");

class Cart extends S.Model {}

Cart.init(
  {
    cart_items: {
      type: S.JSONB,
      allowNull: true,
    },
  },
  { sequelize: db, modelName: "cart" }
);

//hooks

module.exports = Cart;
