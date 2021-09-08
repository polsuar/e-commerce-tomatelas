const express = require("express");
const loginRouter = express.Router();
const { User } = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


// Login
loginRouter.post("/", async (req, res) => {

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
    }
    // res.status(400).send("Invalid Credentials");
  } catch (err) {
    console.log(err);
  }
  // Our register logic ends here
});



module.exports = loginRouter;