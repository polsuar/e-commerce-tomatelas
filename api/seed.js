const faker = require("faker");
const User = require("./models/UsersModel");
const Product = require("./models/ProductsModel");
const Category = require("./models/CategoryModel");
const data = require("./utils/Productos");
const db = require("./db");
const { Op } = require("sequelize");
require("./models/index");

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

db.sync({ force: false })

  .then(() => {
    User.bulkCreate(users);
  })
  .then(() => {
    Product.bulkCreate(data);
  })
  .then(() => {
    Category.bulkCreate(categories);
  })
  .then(async () => {
    Product.findAll({
      where: { name: { [Op.substring]: "Cerveza" } },
    }).then((cervezas) => {
      Category.findOne({ where: { category_name: "Cervezas" } }).then(
        (category) => category.addProducts(cervezas)
      );
    });

    Product.findAll({
      where: { name: { [Op.substring]: "Vino" } },
    }).then((vinos) => {
      Category.findOne({ where: { category_name: "Vinos" } }).then((category) =>
        category.addProducts(vinos)
      );
    });

    Product.findAll({
      where: { name: { [Op.substring]: "Gaseosa" } },
    }).then((gaseosas) => {
      Category.findOne({ where: { category_name: "Gaseosas" } }).then(
        (category) => category.addProducts(gaseosas)
      );
    });

    Product.findAll({
      where: {
        name: { [Op.startsWith]: "Agua", [Op.notILike]: "%Saborizada%" },
      },
    }).then((aguas) => {
      Category.findOne({ where: { category_name: "Aguas" } }).then((category) =>
        category.addProducts(aguas)
      );
    });

    Product.findAll({
      where: {
        name: { [Op.substring]: "Agua Saborizada" },
      },
    }).then((aguasSaborizadas) => {
      Category.findOne({ where: { category_name: "Aguas Saborizadas" } }).then(
        (category) => category.addProducts(aguasSaborizadas)
      );
    });
    Product.findAll({
      where: {
        name: { [Op.substring]: "isotónica" },
      },
    }).then((isotonicas) => {
      Category.findOne({ where: { category_name: "Bebidas Isotónicas" } }).then(
        (category) => category.addProducts(isotonicas)
      );
    });
    Product.findAll({
      where: { name: { [Op.substring]: "Energizante" } },
    }).then((energizantes) => {
      Category.findOne({
        where: { category_name: "Bebidas Energizantes" },
      }).then((category) => category.addProducts(energizantes));
    });

    Product.findAll({
      where: {
        name: { [Op.substring]: "Bebida vegetal" },
      },
    }).then((leches) => {
      Category.findOne({
        where: { category_name: "Leches" },
      }).then((category) => category.addProducts(leches));
    });
  });
