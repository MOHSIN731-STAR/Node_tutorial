const mongoose = require("mongoose");

const couser1Schema = new mongoose.Schema({
  code: String,
  name: String,
  duration: Number,
  description: String,
  fee: Number,
  credits: Number,
});

//OR

module.exports = mongoose.model("Couser1", couser1Schema);
