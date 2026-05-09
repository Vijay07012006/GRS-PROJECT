const express = require("express");
const router = express.Router();
const { getAllCollages, addCollage, updateCollage, deleteCollage } = require("../Controllers/collageController");

// GET all colleges
router.get("/", getAllCollages);

// POST add college
router.post("/", addCollage);

// PUT update college
router.put("/:id", updateCollage);

// DELETE college
router.delete("/:id", deleteCollage);

module.exports = router;