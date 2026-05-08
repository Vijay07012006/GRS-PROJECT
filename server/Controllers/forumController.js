const Forum = require('../model/forumModel');

// Get all posts
const getPosts = async (req, res) => {
  try {
    const posts = await Forum.find()
      .populate('postedBy', 'name email')
      .sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: posts });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Create post (student)
const createPost = async (req, res) => {
  try {
    const { title, content, authorName, studentId } = req.body;
    if (!title) return res.status(400).json({ success: false, message: "Title is required" });

    const newPost = await Forum.create({
      title,
      content: content || "",
      authorName: authorName || "Student",
      postedBy: studentId || null,
    });
    res.status(201).json({ success: true, data: newPost });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Student reply
const addReply = async (req, res) => {
  try {
    const { id } = req.params;
    const { authorName, reply } = req.body;
    if (!reply) return res.status(400).json({ success: false, message: "Reply required" });

    const post = await Forum.findByIdAndUpdate(
      id,
      { $push: { replies: { authorName: authorName || "Student", reply, isAdmin: false } } },
      { new: true }
    );
    if (!post) return res.status(404).json({ success: false, message: "Post not found" });
    res.status(200).json({ success: true, data: post });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ Admin reply / issue clear
const adminReply = async (req, res) => {
  try {
    const { id } = req.params;
    const { reply } = req.body;
    if (!reply) return res.status(400).json({ success: false, message: "Reply required" });

    const post = await Forum.findByIdAndUpdate(
      id,
      {
        $push: {
          replies: {
            authorName: "Admin",
            reply,
            isAdmin: true
          }
        },
        status: "resolved"  // ✅ issue clear mark
      },
      { new: true }
    );
    if (!post) return res.status(404).json({ success: false, message: "Post not found" });
    res.status(200).json({ success: true, data: post });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ Delete post (admin)
const deletePost = async (req, res) => {
  try {
    const post = await Forum.findByIdAndDelete(req.params.id);
    if (!post) return res.status(404).json({ success: false, message: "Post not found" });
    res.status(200).json({ success: true, message: "Post deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { createPost, getPosts, addReply, adminReply, deletePost };