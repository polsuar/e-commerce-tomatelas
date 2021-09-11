const faker = require("faker");
const User = require("./models/UsersModel");
const Product = require("./models/ProductsModel");
const Categorie = require("./models/CategoryModel");
const data = require("./utils/Productos");
const users = [];

for (let i = 0; i < 10; i++) {
  users.push({
    userName: faker.internet.userName(),
    email: faker.internet.email(),
    firstName: faker.name.findName(),
    LastName: faker.name.lastName(),
    gender: faker.name.gender(),
    password: faker.internet.password(),
    street: faker.address.streetAddress(),
    province: faker.address.state(),
    city: faker.address.city(),
    zipcode: faker.address.zipCode(),
    phone: faker.phone.phoneNumber(),
  });
}

User.bulkCreate(users)
  .then(() => console.log("users create succesfully"))
  .catch(() => console.log("error withe users creation"));

// const products = [];

// for (let i = 0; i < 10; i++) {
//   products.push({
//     name: faker.commerce.productName(),
//     price: faker.datatype.number(1000),
//     volume: faker.datatype.number(12),
//     category: faker.commerce.department(),
//     brand: faker.company.companyName(),
//     stock: faker.datatype.number(50),
//     img: "https://source.unsplash.com/random",
//     description: faker.commerce.productDescription(),
//   });
// }

Product.bulkCreate(data)
  .then(() => console.log("products create succesfully"))
  .catch(() => console.log("error with products create"));

const categories = [
  { category_name: "Cervezas" },
  { category_name: "Gaseosas" },
  { category_name: "Aguas" },
  { category_name: "Aguas Saborizadas" },
  { category_name: "Bebidas Energizantes" },
  { category_name: "Bebidas Isotónicas" },
  { category_name: "Vinos" },
  { category_name: "Leches" },
];

Categorie.bulkCreate(categories)
  .then(() => console.log("categories create succesfully"))
  .catch(() => console.log("error with categories create"));
