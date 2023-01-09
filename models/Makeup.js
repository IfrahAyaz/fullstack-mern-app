const mongoose = require("mongoose");
const makeupSchema = mongoose.Schema({
  name: String,
  price: Number,
  color: String,
  brand: String,
  description: String,
  image: String,
});
const Makeup = mongoose.model("Makeup", makeupSchema);
module.exports = Makeup;
