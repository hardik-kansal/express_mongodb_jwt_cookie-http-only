const express = require("express");
const jwt = require("jsonwebtoken");
const routerEditArticle = express.Router();
const articles = require("../model/new");

routerEditArticle.get(
  "/:userselected",
  authenticate,
  async (req, res, next) => {
    const userselected = req.params.userselected;
    const article1 = await articles.find({
      $and: [{ _id: userselected }, { email: req.client.e }],
    });
    console.log(article1);
    if (article1.length == 0) {
      res.sendStatus(401);
    } else {
      res.render("edit", { article1: article1[0] });
    }
  }
);
routerEditArticle.post("/:id", authenticate, async (req, res, next) => {
  try {
    const _title = req.body.title;
    const _desc = req.body.desc;
    const _content = req.body.content;
    await articles.updateOne(
      { email: req.client.e },
      { $set: { title: _title, desc: _desc, content: _content } }
    );
    console.log("Saved");
    res.redirect("/");
  } catch (e) {
    res.sendStatus(401);
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
module.exports = routerEditArticle;
