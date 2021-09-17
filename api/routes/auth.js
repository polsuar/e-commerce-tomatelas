const express = require("express");
const router = express.Router();
const User = require("../models/UsersModel");
const Cart = require("../models/CartModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Login
router.post("/login", async (req, res) => {
  // Our login logic starts here
  try {
    // Get user input
    const { userName, password } = req.body;

    // Validate user input
    if (!(userName && password)) {
      res.status(400).send("All input is required");
    }
    // Validate if user exist in our database

    const user = await User.findOne({ where: { userName } });

    if (user && (await bcrypt.compare(password, user.password))) {
      // Create token
      const token = jwt.sign(
        { user_id: user.id, userName },
        process.env.TOKEN_KEY,
        {
          expiresIn: "2h",
        }
      );

      // save user token
      user.token = token;
      // user
      res.status(200).json(user);
    } else res.status(400).send("Invalid Credentials");
  } catch (err) {
    res.status(409).send(err);
  }
  // Our login logic ends here
});

// Register
router.post("/register", async (req, res) => {
  // Our register logic starts here
  try {
    // Get user input
    const {
      userName,
      email,
      firstName,
      lastName,
      gender,
      password,
      street,
      city,
      province,
      zipcode,
      phone,
    } = req.body;
    // Validate user input
    if (!(email && password && userName && firstName && lastName)) {
      res.status(400).send("All input is required");
    }

    // check if user already exist
    // Validate if user exist in our database

    const oldUser = await User.findOne({ where: { email } });

    if (oldUser) {
      return res.status(409).send("User Already Exist. Please Login");
    }

    //Encrypt user password
    // let encryptedPassword = await bcrypt.hash(password, 10);

    // Create user in our database
    const user = await User.create({
      userName,
      email: email.toLowerCase(), // sanitize: convert email to lowercase
      firstName,
      lastName,
      gender,
      password,
      street,
      city,
      province,
      zipcode,
      phone,
    });

    // Create token
    const token = jwt.sign(
      { user_id: user.id, userName },
      process.env.TOKEN_KEY,
      {
        expiresIn: "2h",
      }
    );
    // save user token
    user.token = token;

    //create cart
    Cart.create({ userId: user.id });

    // return new user
    res.status(201).json(user);
  } catch (err) {
    res.status(409).send(err);
  }
  // Our register logic ends here
});

module.exports = router;
