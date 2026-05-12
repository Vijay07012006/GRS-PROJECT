const Admin = require("../model/Admin");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// ==========================
// Register Admin
// ==========================
exports.registerAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check existing email
    const exists = await Admin.findOne({ email });

    if (exists) {
      return res.status(400).json({
        msg: "Email Already Exists",
      });
    }

    // Only one admin allowed
    const adminCount = await Admin.countDocuments();

    if (adminCount > 0) {
      return res.status(400).json({
        msg: "Admin Already Registered",
      });
    }

    // Hash password
    const passwordHash = await bcrypt.hash(password, 10);

    // Create admin
    const adminReg = new Admin({
      email,
      password: passwordHash,
    });

    await adminReg.save();

    res.json({
      msg: "Admin Registered Successfully",
    });

  } catch (err) {
    console.log(err.message);

    res.status(500).json({
      msg: "Server Error",
      error: err.message,
    });
  }
};

// ==========================
// Login Admin
// ==========================
exports.loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check email
const admin = await Admin.findOne({}).select("+password");

    if (!data) {
      return res.status(404).json({
        msg: "Email Not Matched",
      });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, data.password);

    if (!isMatch) {
      return res.status(400).json({
        msg: "Password Not Matched",
      });
    }

    // Generate token
    const token = jwt.sign(
      {
        id: data._id,
        role: "Admin",
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );

    res.json({
      msg: "Login Successfully",
      token,
      role: "Admin",
      id: data._id,
    });

  } catch (err) {
    console.log(err.message);

    res.status(500).json({
      msg: "Try again later",
    });
  }
};
// ==========================
// Change Admin Password
// ==========================
exports.changeAdminPassword = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;

    if (!oldPassword || !newPassword) {
      return res.status(400).json({ msg: "Old aur New password dono required hain" });
    }

    // ✅ .select("+password") add kiya
    const admin = await Admin.findOne({}).select("+password");
    
    if (!admin) {
      return res.status(404).json({ msg: "Admin nahi mila" });
    }

    const isMatch = await bcrypt.compare(oldPassword, admin.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Old password galat hai" });
    }

    admin.password = await bcrypt.hash(newPassword, 10);
    await admin.save();

    res.json({ msg: "Password successfully update ho gaya!" });

  } catch (err) {
    console.log(err.message);
    res.status(500).json({ msg: "Server Error", error: err.message });
  }
};