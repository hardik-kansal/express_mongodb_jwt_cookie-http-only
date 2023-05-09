const express = require("express");
const jwt = require("jsonwebtoken");
const routerIN = express.Router();
const user = require("../model/user");
routerIN.get("/", (req, res, next) => {
  res.render("sign_in");
});

routerIN.post("/", async (req, res, next) => {
  try {
    _e = req.body.e;
    _p = req.body.p;
    const user1 = await user.findOne({ e: _e }); // Dont use where ????
    if (!user1) {
      res.sendStatus(401);
    }
    if (_p == user1.ps) {
      const token = jwt.sign({ e: _e, p: _p }, process.env.ACCESS_SECRET_KEY);
      res.cookie("token", token, { httpOnly: true });
      res.redirect("/");
    } else {
      res.send("Password Invalid ! Retry");
    }
  } catch (e) {
    console.log(e.message);
  }
});
module.exports = routerIN;
