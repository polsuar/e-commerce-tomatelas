const S = require("sequelize");
const db = require("../db");

class Favorites extends S.Model {}
Favorites.init(
  {
    title: {
      type: S.STRING,
    },
  },
  { sequelize: db, modelName: "favorites" }
);

//hooks

//class methods

//instance methods

module.exports = Favorites;
