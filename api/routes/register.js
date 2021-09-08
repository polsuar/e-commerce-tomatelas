const express = require("express");
const registerRouter = express.Router();
const { User } = require("../models");
// const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Register
registerRouter.post("/", async (req, res) => {
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
      zipCode,
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
      zipCode,
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

    // return new user
    res.status(201).json(user);
  } catch (err) {
    console.log(err);
  }
  // Our register logic ends here
});


module.exports = registerRouter;