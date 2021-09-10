const S = require("sequelize");
const db = require("../db");

class Categories extends S.Model {}
Categories.init(
  {
    category_id: {
      type: S.INTEGER,
      primaryKey: true,
    },
    category_name: {
      type: S.STRING,
      allowNull: false,
    },
  },
  { sequelize: db, modelName: "category" }
);

module.exports = Categories;
