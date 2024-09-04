const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

//importing routes
const authRoutes = require("./routes/auth");

const app = express();

//global Middlewares
app.use(bodyParser.json());
app.use(cors({ origin: "*" }));

//routes
app.use(authRoutes);

mongoose.connect(process.env.MONGO_URL).then((_) => {
  app.listen(4000);
  console.log("Server is running on port 4000 and connected to database.");
});
