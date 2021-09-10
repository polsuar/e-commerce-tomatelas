const User = require("./UsersModel");
const Product = require("./ProductsModel");
const Cart = require("./CartModel");
const PayMethod = require("./PayMethodsModel");
const Categories = require("./CategoryModel");
const Orders = require("./OrdersModel");

User.belongsToMany(Product, { through: "favorites" });

//category belognsToMany products
Categories.hasMany(Product, {
  foreignKey: "category_id",
});
// cart

User.hasOne(Cart, {
  foreignKey: "user_id",
});
User.hasMany(Orders, {
  foreignKey: "user_id",
});

module.exports = { User, Product };
