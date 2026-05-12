const express = require("express");
const router = express.Router();
const { 
  registerAdmin, 
  loginAdmin,
  changeAdminPassword  // ✅ ye add karo
} = require("../Controllers/adminController");

// REGISTER
router.post("/register", registerAdmin);

// LOGIN
router.post("/login", loginAdmin);

// CHANGE PASSWORD  ✅ ye add karo
router.post("/change-password", changeAdminPassword);

module.exports = router;