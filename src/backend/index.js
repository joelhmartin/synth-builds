const express = require("express");
const app = express();
const router = express.Router();
const cors = require("cors");
const mongoose = require("mongoose");
const patches = require("./routes/patches");
const users = require("./routes/users");
const url = "mongodb://localhost/patches"; //Change this to /SynthSiteDB
require("dotenv").config({ path: "./config.env" });

const port = 3000;

mongoose
  .connect(url)
  .then(() => console.log("Connected"))
  .catch((err) => console.log(err));

// Use cors middleware with default options
app.use(cors());
app.use(express.json());
app.use("/api/patches", patches);
app.use("/api/users", users);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
