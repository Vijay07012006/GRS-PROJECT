const mongoose = require("mongoose");

const complaintTypesSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {  
        type: String,
        required: true
    }
}, {
    timestamps: true
});

// ✅ FIXED: "CompalaintType" → "ComplaintType" (typo tha)
module.exports = mongoose.model("ComplaintType", complaintTypesSchema);