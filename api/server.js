require("dotenv").config()

const express = require("express");
const app = express();
const db = require("./db");

const routes = require("./routes");
app.use("/api", routes);

const PORT = process.env.PORT ; // vale la pena un dotEnv?

db.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`server listenning on port ${PORT}`));
});
