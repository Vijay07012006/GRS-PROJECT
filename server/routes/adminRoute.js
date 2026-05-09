const express = require("express");
const router = express.Router();
const { registerAdmin, loginAdmin } = require("../Controllers/adminController");

// REGISTER
router.post("/register", registerAdmin);

// LOGIN
router.post("/login", loginAdmin);

module.exports = router;