const mongoose = require("mongoose");
const validator = require("validator");

const noteSchema = new mongoose.Schema({
  language: {
    type: String,
    required: true,
  },
  letter: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 1,
  },
  section: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    validate: {
      validator: (v) => validator.isURL(v),
    },
  },
  description: {
    type: String,
    required: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
    select: false,
  },
});

module.exports = mongoose.model("note", noteSchema);
