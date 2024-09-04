const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

//importing routes
const authRoutes = require("./routes/auth");

const app = express();
app.use(authRoutes);

mongoose.connect(process.env.MONGO_URL).then((_) => {
  app.listen(4000);
  console.log("Server is running on port 4000 and connected to database.");
});
