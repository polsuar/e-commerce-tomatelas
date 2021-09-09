const express = require("express");
const cors = require("cors");
const app = express();
const db = require("./db");
const models = require("./models");
const routes = require("./routes");

// require("dotenv").config();
app.use(cors());

app.use(express.json());

app.use("/api", routes);

const PORT = 3001;

db.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`server listenning on port ${PORT}`));
});
