const mongoose = require('mongoose');

const forumSchema = new mongoose.Schema({
  title:      { type: String, required: true, trim: true },
  content:    { type: String, default: "" },
  authorName: { type: String, default: "Student" },
  postedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',
    required: false
  },
  status: {
    type: String,
    enum: ["open", "resolved"],
    default: "open"          // ✅ open = pending, resolved = admin ne clear kiya
  },
  replies: [
    {
      authorName: { type: String, default: "Student" },
      reply:      { type: String, required: true },
      isAdmin:    { type: Boolean, default: false }, // ✅ admin reply identify karne ke liye
      createdAt:  { type: Date, default: Date.now }
    }
  ],
}, { timestamps: true });

module.exports = mongoose.model('Forum', forumSchema);