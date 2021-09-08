var faker = require("faker");
const User = require("./models/UsersModel");
const Product = require("./models/ProductsModel");

const users = [];

for (let i = 0; i < 10; i++) {
  users.push({
    username: faker.internet.userName(),
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
// console.log(users);
User.bulkCreate(users)
  .then(() => console.log("users create succesfully"))
  .catch(() => console.log("error with users create"));

const products = [];

for (let i = 0; i < 10; i++) {
  products.push({
    name: faker.commerce.productName(),
    volume: faker.datatype.number(12),
    category: faker.commerce.department(),
    brand: faker.company.companyName(),
    stock: faker.datatype.number(50),
    img: faker.image.food(),
    description: faker.commerce.productDescription(),
  });
}

Product.bulkCreate(products)
  .then(() => console.log("products create succesfully"))
  .catch(() => console.log("error with products create"));
