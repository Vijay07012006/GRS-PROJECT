const mongoose = require("mongoose");

const userLogSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student",
    required: true
  },
  userName: {
    type: String,
    required: true
  },
  userEmail: {
    type: String,
    required: true
  },
  action: {
    type: String,
    enum: ["login", "logout"],
    required: true
  },
  ipAddress: {
    type: String,
    default: "Unknown"
  }
}, { timestamps: true });

module.exports = mongoose.model("UserLog", userLogSchema);