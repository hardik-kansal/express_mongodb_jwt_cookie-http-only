const express = require("express");
const jwt = require("jsonwebtoken");
const routerDeleteArticle = express.Router();
const newArticle = require("../model/new");
routerDeleteArticle.delete("/:id", authenticate, async (req, res) => {
  try {
    const id = req.params.id;
    console.log(id);
    const article1 = await newArticle.findOne({
      //find one & find return value differes
      $and: [{ _id: id }, { email: req.client.e }],
    });
    console.log(article1);
    if (!article1) {
      res.sendStatus(401);
    } else {
      await newArticle.findByIdAndDelete(id);
      res.render("/");
    }
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
module.exports = routerDeleteArticle;
