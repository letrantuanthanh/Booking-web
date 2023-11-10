const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");

const shopRoutes = require("./routes/shop");
const adminRoutes = require("./routes/admin");

const app = express();
app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(adminRoutes);
app.use(shopRoutes);

mongoose
  .connect("mongodb+srv://thanhle:546546@cluster0.sbqngei.mongodb.net/")
  .then((result) => {
    app.listen(5000, () => {
      console.log("Server started at port 5000!");
    });
  })
  .catch((err) => {
    console.log(err);
  });
