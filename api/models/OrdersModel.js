const S = require("sequelize");
const db = require("../db");

class Order extends S.Model {}
Order.init(
  {
    order_id: {
      type: S.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: S.INTEGER,
    },
    userName: {
      type: S.STRING,
    },
    products: {
      type: S.JSONB,
      primaryKey: true,
    },
    total_price: {
      type: S.INTEGER,
      allowNull: false,
    },
    created: {
      type: S.STRING,
    },
    state: {
      type: S.STRING,
      allowNull: false,
      defaultValue: "pending",
    },
  },
  { sequelize: db, modelName: "order" }
);

module.exports = Order;
