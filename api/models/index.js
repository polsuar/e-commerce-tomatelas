const User = require("./UsersModel");
const Product = require("./ProductsModel");
const Cart = require("./CartModel");
const Categories = require("./CategoryModel");
const Order = require("./OrdersModel");

///////////////////////////////FAVOTITES///////////////////////////////
User.belongsToMany(Product, { through: "favorites" });
Product.belongsToMany(User, { through: "favorites" });

//////////////////////////////CATEGORIES///////////////////////////////
Product.belongsToMany(Categories, { through: "Products_Categories" });
Categories.belongsToMany(Product, { through: "Products_Categories" });

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
Product.belongsToMany(User, { through: "Review" });
User.belongsToMany(Product, { through: "Review" });

module.exports = { User, Product };
