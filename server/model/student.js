const mongoose = require("mongoose");

const studentSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    fatherName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    mobile: {
      type: String,
      required: true,
    },
    dob: {
      type: String,
      required: true,
    },
    sessionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Collage",
    },
    pincode: {
      type: String,
      required: true,
    },
    course: {
      type: String,
      default: "N/A",
    },
    collageId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Collage",
    },
    picture: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);
module.exports = mongoose.model("Student", studentSchema);
