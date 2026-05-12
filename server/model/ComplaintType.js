const mongoose = require("mongoose");

const complaintTypesSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
     },
    description: {
  type: String,
  required: false,  // optional karo
  default: "",
},
    isActive: {
      type: Boolean,
      default: true,                  
    },
  },
  {
    timestamps: true,
  }
);

// Optional: index for faster lookups by name
complaintTypesSchema.index({ name: 1 });

module.exports = mongoose.model("ComplaintType", complaintTypesSchema);