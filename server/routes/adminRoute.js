const express = require("express");
const router = express.Router();
const {
  registerAdmin,
  loginAdmin,
  changeAdminPassword,
  seedAdminTemp
} = require("../Controllers/adminController");

const Admin = require("../model/Admin");

// REGISTER
router.post("/register", registerAdmin);

// LOGIN
router.post("/login", loginAdmin);

// CHANGE PASSWORD
router.post("/change-password", changeAdminPassword);

// SEED TEMP ROUTE
router.get("/seed-temp", seedAdminTemp);

// TEMPORARY ROUTE
router.get("/all", async (req, res) => {
  const data = await Admin.find();
  res.json(data);
});

module.exports = router;