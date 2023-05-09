const express = require("express");
const app = express();
require("./script");
const jwt = require("jsonwebtoken");
const path = require("path");
const user = require("./model/user");
const newArticle = require("./model/new");
const routerDEL = require("./routes/delete");
const routerIN = require("./routes/sign_in");
const routerUP = require("./routes/sign_up");
const routerNew = require("./routes/new");
const routerEdit = require("./routes/edit");
const cookieParser = require("cookie-parser");
const methodOverride = require("method-override");
app.use(methodOverride("_method"));
app.use(cookieParser());

app.use(express.json()); // parse json format like in a cookie and populates req.body
app.use(express.urlencoded({ extended: false })); //Form Submission(url-encoded format) and populate req.body

app.set("view engine", "ejs");

const static_path = path.join(__dirname, "public");
app.use(express.static(static_path));

app.use("/sign_in", routerIN);
app.use("/sign_up", routerUP);
app.use("/new", routerNew);
app.use("/edit", routerEdit);
app.use("/delete", routerDEL);

app.get("/", async (req, res, next) => {
  const articleslist = await newArticle.find();
  res.render("index", {
    articles: articleslist,
  });
});
app.get("/logout", (req, res) => {
  res.clearCookie("token");
  res.json({ message: "Logged out successfully" });
});
app.listen(3000);
console.log("Server Started");
