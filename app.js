const express = require("express");
const app = express();
require("dotenv").config();

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.set("views", __dirname + "/views");
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("index", { title: "Home Page" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT);
