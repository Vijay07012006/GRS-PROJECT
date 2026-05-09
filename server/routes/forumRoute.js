const express = require("express");
const router = express.Router();
const { createPost, getPosts, addReply, adminReply, deletePost } = require("../Controllers/forumController");

router.get("/posts", getPosts);                    // Dono fetch karte hain
router.post("/posts", createPost);                 // student post karta hai
router.post("/posts/:id/reply", addReply);         // student reply
router.post("/posts/:id/admin-reply", adminReply); // ✅ admin reply / clear
router.delete("/posts/:id", deletePost);           // ✅ admin delete

module.exports = router;
