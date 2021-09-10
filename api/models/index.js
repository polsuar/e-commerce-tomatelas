const User = require("./UsersModel");
const Product = require("./ProductsModel");
const Cart = require("./CartModel");
const PayMethod = require("./PayMethodsModel");
const Favorite = require("./FavoritesModel");
const Categories = require("./CategoryModel");
const Orders = require("./OrdersModel");

User.belongsToMany(Product, { through: Favorites });

User.hasOne(Cart, {
  foreignKey: "user_id",
});
User.hasMany(Orders, {
  foreignKey: "user_id",
});

Categories.hasMany(Product, {
  foreignKey: "category_id",
});

module.exports = { User, Product };
