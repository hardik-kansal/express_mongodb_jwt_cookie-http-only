const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  fn: {
    type: String,
    minLength: 1,
    maxLength: 10,
  },
  ln: {
    type: String,
    minLength: 1,
    maxLength: 10,
  },
  e: {
    type: String,
    lowercase: true,
    unique: true,
  },
  ps: {
    type: String,
  },
});

module.exports = mongoose.model("user", userSchema);
