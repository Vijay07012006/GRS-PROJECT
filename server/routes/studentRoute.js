const express = require("express");
const router = express.Router();
const {
    getStudents,
    registerStudent,
    loginStudent,
    updateProfile,      // ✅ add karo
    changePassword      // ✅ add karo
} = require("../Controllers/studentController");

// GET all students
router.get("/", getStudents);

// REGISTER student
router.post("/register", registerStudent);

// LOGIN student
router.post("/login", loginStudent);

// ✅ NAYE ROUTES
router.put("/update-profile", updateProfile);
router.post("/change-password", changePassword);

module.exports = router;