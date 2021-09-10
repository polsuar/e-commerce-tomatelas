const S = require("sequelize");
const db = require("../db");
const bcrypt = require("bcrypt");

class User extends S.Model {
  hash(password, salt) {
    return bcrypt.hash(password, salt);
  }
}

User.init(
  {
    userName: {
      type: S.STRING,
      allowNull: false,
      unique: {
        args: true,
        msg: "Username already exist!",
      },
    },
    email: {
      type: S.STRING,
      allowNull: false,
      unique: {
        args: true,
        msg: "Email address already in use!",
      },
      validate: {
        isEmail: true,
      },
    },
    isAdmin: {
      type: S.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    firstName: {
      type: S.STRING,
    },
    lastName: {
      type: S.STRING,
    },
    gender: {
      type: S.STRING,
    },
    password: {
      type: S.STRING,
      allowNull: false,
    },
    street: {
      //calle y altura
      type: S.STRING,
      allowNull: false, // Los allowNull si desde front no se crean sacarlos para pruebas
    },
    province: {
      // Provincia bs, tucuman , salta ...
      type: S.STRING,
    },
    city: {
      //Ciudad, san martin, villa del parque ...
      type: S.STRING,
    },
    zipcode: {
      type: S.STRING,
    },
    phone: {
      type: S.STRING,
    },
    salt: {
      type: S.STRING,
    },
    token: {
      type: S.STRING,
    },
  },
  { sequelize: db, modelName: "user" }
);

//hooks

User.beforeCreate((user) => {
  return bcrypt
    .genSalt(16)
    .then((salt) => {
      user.salt = salt;
      return user.hash(user.password, salt);
    })
    .then((hash) => {
      user.password = hash;
    });
});

module.exports = User;
