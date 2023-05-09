const express = require("express");
const routerNewArticle = express.Router();
const jwt = require("jsonwebtoken");
require("dotenv").config();
const newArticle = require("../model/new");
const user = require("../model/user");
routerNewArticle.get("/", authenticate, (req, res, next) => {
  res.render("new.ejs");
});
routerNewArticle.post("/", authenticate, async (req, res, next) => {
  try {
    const newarticle = new newArticle({
      title: req.body.title,
      desc: req.body.desc,
      content: req.body.content,
      email: req.client.e,
    });
    await newarticle.save();
    console.log("saved");
    res.redirect("/");
  } catch (e) {
    console.log(e.message);
  }
});

function authenticate(req, res, next) {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  jwt.verify(token, process.env.ACCESS_SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    req.client = decoded;
    next();
  });
}
module.exports = routerNewArticle;
