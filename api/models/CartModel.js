const S = require("sequelize");
const db = require("../db");

class Cart extends S.Model {}

Cart.init(
  {
    cart_id: {
      type: S.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    cart_items: {
      type: S.JSONB,
      allowNull: true,
    },
    user_id: {
      type: S.INTEGER,
    },
  },
  { sequelize: db, modelName: "cart" }
);

//hooks

module.exports = Cart;
