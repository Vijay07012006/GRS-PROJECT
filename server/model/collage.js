const mongoose = require("mongoose");

const collageSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  code: {
    type: String,
    required: true,
    unique: true
  },
  location: {
    type: String,
    default: ""
  }
}, {
  timestamps: true
});

module.exports = mongoose.model("Collage", collageSchema);