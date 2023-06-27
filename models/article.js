const mongoose = require("mongoose");
// const validator = require("validator");

const articleSchema = new mongoose.Schema({
  keyword: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  publishedAt: {
    type: String,
    required: true,
  },
  source: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
    // validate: {
    //   validator: (v) => validator.isURL(v),
    //   message: "Please enter a valid URL",
    // },
  },
  urlToImage: {
    type: String,

    // validate: {
    //   validator: (v) => validator.isURL(v),
    //   message: "Please enter a valid URL for image",
    // },
  },
  owner: {
    type: String,

    required: true,
  },
});

module.exports = mongoose.model("article", articleSchema);
