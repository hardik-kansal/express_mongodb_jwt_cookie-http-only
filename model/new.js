const mongoose = require("mongoose");
const articleSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
    minLength: 1,
    maxLength: 30,
  },
  desc: {
    type: String,
    required: true,
    minLength: 1,
    maxLength: 50,
  },
  content: {
    type: String,
    required: true,
    minLength: 1,
  },
  date: {
    type: String,
    default: new Date().toLocaleDateString(),
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
  },
});
module.exports = mongoose.model("news", articleSchema);
