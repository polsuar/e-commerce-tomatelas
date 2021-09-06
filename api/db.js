const Sequelize = require("sequelize");

const sequelize = new Sequelize("e_commerce_tomatelas", null, null, {
  host: "localhost",
  dialect: "postgres",
  logging: false,
});

module.exports = sequelize;
