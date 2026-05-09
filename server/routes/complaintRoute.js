const express = require("express");
const router = express.Router();
const {
    getStudentComplaints,
    getAllComplaints,
    addComplaint,
    updateComplaint,
    deleteComplaint
} = require("../Controllers/complaintController");

// GET - Student complaints
router.get("/student/:studentId", getStudentComplaints);

// GET - All complaints (admin)
router.get("/", getAllComplaints);

// POST - Add complaint
router.post("/", addComplaint);

// PATCH - Update complaint
router.patch("/:id", updateComplaint);

// DELETE - complaint
router.delete("/:id", deleteComplaint);

module.exports = router;