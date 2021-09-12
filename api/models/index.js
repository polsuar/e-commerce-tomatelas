const User = require("./UsersModel");
const Product = require("./ProductsModel");
const Cart = require("./CartModel");
const Category = require("./CategoryModel");
const Order = require("./OrdersModel");

///////////////////////////////FAVOTITES///////////////////////////////
User.belongsToMany(Product, { through: "favorites" });
Product.belongsToMany(User, { through: "favorites" });

//////////////////////////////CATEGORIES///////////////////////////////
Product.belongsToMany(Category, { through: "product_category" });
Category.belongsToMany(Product, { through: "product_category" });

/////////////////////////////////CART//////////////////////////////////

///////////////cart & user//////////////
User.hasOne(Cart, {
  foreignKey: "user_id",
});
Cart.belongsTo(User);

////////////////cart & product//////////
Cart.belongsToMany(Product, { through: "cart_items" });
Product.belongsToMany(Cart, { through: "cart_items" });

////////////////////////////////ORDERS/////////////////////////////////
User.hasMany(Order, {
  foreignKey: "user_id",
});
Order.hasOne(User);

///////////////////////////////REVIEWS/////////////////////////////////
Product.belongsToMany(User, { through: "review" });
User.belongsToMany(Product, { through: "review" });

module.exports = { User, Product };
