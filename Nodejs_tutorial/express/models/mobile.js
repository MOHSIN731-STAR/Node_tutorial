const mongoose = require("mongoose");
const mobileSchema = new mongoose.Schema({
  modelname: String,
  email: String,
  password: String,
  Location: String,
});
module.exports = mongoose.model("mobile", mobileSchema);
