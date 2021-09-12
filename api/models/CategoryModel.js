const S = require("sequelize");
const db = require("../db");

class Category extends S.Model {}
Category.init(
  {
    category_id: {
      type: S.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    category_name: {
      type: S.STRING,
      allowNull: false,
    },
  },
  { sequelize: db, modelName: "category" }
);

module.exports = Category;
