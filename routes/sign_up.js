const express = require("express");
require("dotenv").config();
const bcrypt = require("bcrypt");
const user = require("../model/user");
const routerUP = express.Router();
routerUP.get("/", (req, res, next) => {
  res.render("sign_up");
});
routerUP.post("/", async (req, res, next) => {
  try {
    _fn = req.body.fn;
    _ln = req.body.ln;
    _e = req.body.e;
    _p = req.body.p;
    const user1 = await user.create({ fn: _fn, ln: _ln, e: _e, ps: _p });
    res.redirect("/");
  } catch (e) {
    return res.json(e);
  }
});
module.exports = routerUP;
