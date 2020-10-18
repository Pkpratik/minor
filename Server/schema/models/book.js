const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bookSchema = new Schema({
  isbn: String,
  name: String,
  genre: [String],
  image: String,
  rating: Number,
  author: [String],
  description: String,
});

module.exports = mongoose.model("Book", bookSchema);
