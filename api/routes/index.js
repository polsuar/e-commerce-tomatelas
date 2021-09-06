const express = require("express");
const router = express.Router();

router.use("/users", require("./users"));
router.use("/productos", require("./products"));

module.exports = router;
