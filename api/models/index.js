const User = require("./UsersModel");
const Product = require("./ProductsModel");
const Cart = require("./CartModel");
const PayMethod = require("./PayMethodsModel");
const Categories = require("./CategoryModel");
const Orders = require("./OrdersModel");

//FAVOTITES
User.belongsToMany(Product, { through: "favorites" });

//CATEGORIES
Categories.hasMany(Product, {
  foreignKey: "category_id",
});

// CART
User.hasOne(Cart, {
  foreignKey: "user_id",
});

//ORDERS
User.hasMany(Orders, {
  foreignKey: "user_id",
});

module.exports = { User, Product };
