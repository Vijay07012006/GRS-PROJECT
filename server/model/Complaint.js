const mongoose = require("mongoose");

const complaintSchema = mongoose.Schema({
    complaintType: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "ComplaintType"
    },
    complaintText: {
        type: String,
        required: true
    },
    studentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Student",
        required: true
    },
    status: {
        type: String,
        // ✅ FIX: "resolved" bhi add kiya — admin "resolved" ya "closed" dono de sakta hai
        enum: ['pending', 'in-progress', 'closed', 'rejected', 'resolved'],
        default: 'pending'
    },
    adminResponse: {
        type: String,
        default: ""
    }
}, { timestamps: true });

module.exports = mongoose.model('Complaint', complaintSchema);