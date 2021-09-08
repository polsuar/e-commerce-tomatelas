const express = require("express");
const app = express();
const db = require("./db");
const { User } = require("./models");
const routes = require("./routes");
const users = require("./seed");
// require("dotenv").config();
console.log(process.env.TOKEN_KEY);
app.use(express.json);

app.use("/api", routes);

const PORT = process.env.PUERTO || 3001;

db.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`server listenning on port ${PORT}`));
});
