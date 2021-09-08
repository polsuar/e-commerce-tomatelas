const express = require("express");
const router = express.Router();
const auth = require("../config/auth");

router.use("/users", require("./users"));
router.use("/productos", require("./products"));
router.use("/register", require("./register"));
router.use("/login", require("./login"));


router.get("/welcome", auth, (req, res) => {
  res.status(200).send(`Welcome ${req.user.user_id}`);
});

module.exports = router;
