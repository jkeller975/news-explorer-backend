const mongoose = require("mongoose");
const validator = require("validator");

const articleSchema = new mongoose.Schema({
  keyword: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  source: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: true,
    validate: {
      validator: (v) => validator.isURL(v),
      message: "Please enter a valid URL",
    },
  },
  image: {
    type: String,
    required: true,
    validate: {
      validator: (v) => validator.isURL(v),
      message: "Please enter a valid URL for image",
    },
  },
  owner: {
    type: mongoose.SchemaType.Types.ObjectId,
    ref: "user",
    required: true,
  },
});

module.exports = mongoose.model("article", articleSchema);
