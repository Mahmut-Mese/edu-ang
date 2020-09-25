const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const CategorySchema = new Schema({
  title: String,
  image: String,
  description: String,
  created: { type: Date, default: Date.now },
});
module.exports = mongoose.model("Category", CategorySchema);
