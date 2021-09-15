const User = require("./UsersModel");
const Product = require("./ProductsModel");
const Cart = require("./CartModel");
const Category = require("./CategoryModel");
const Order = require("./OrdersModel");

///////////////////////////////FAVORITES///////////////////////////////
User.belongsToMany(Product, { through: "favorites" });
Product.belongsToMany(User, { through: "favorites" });

//////////////////////////////CATEGORIES///////////////////////////////
Product.belongsToMany(Category, { through: "product_category" });
Category.belongsToMany(Product, { through: "product_category" });
/////////////////////////////////CART//////////////////////////////////

///////////////cart & user//////////////
User.hasOne(Cart);
Cart.belongsTo(User);

////////////////cart & product//////////
Cart.belongsToMany(Product, { through: "cart_item" });
Product.belongsToMany(Cart, { through: "cart_item" });

////////////////////////////////ORDERS/////////////////////////////////
User.hasMany(Order);
Order.hasOne(User);
///////////////////////////////REVIEWS/////////////////////////////////

/* problemas con magic methods ' repetidos' de favoritos 

Product.belongsToMany(User, { through: "review" });
User.belongsToMany(Product, { through: "review" });

*/
module.exports = { User, Product };
