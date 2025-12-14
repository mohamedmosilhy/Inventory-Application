require("dotenv").config();
const express = require("express");
const app = express();
const categoriesRouter = require("./routes/categories");
const instrumentsRouter = require("./routes/instruments");

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.set("views", __dirname + "/views");
app.use(express.static("public"));

app.use("/categories", categoriesRouter);
app.use("/instruments", instrumentsRouter);

app.get("/", (req, res) => {
  res.render("index.ejs", { title: "Home Page" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT);
