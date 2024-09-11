const mongoose = require("mongoose");
const couserSchema = new mongoose.Schema({
  teacher: String,
  course: String,
  coursename: String,
  code: Number,
});

module.exports = mongoose.model("couser", couserSchema);
