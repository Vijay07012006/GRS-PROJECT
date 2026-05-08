
const express = require('express');
const Admin = require('../model/Admin');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const routes = express.Router();

// Register Admin
routes.post('/', async (req, res) => {
    try {
        const { email, password } = req.body;

        const exists = await Admin.findOne({ email });
        if (exists) return res.status(400).json({ msg: "Email Already Exists" });

        const adminCount = await Admin.countDocuments();
        if (adminCount > 0) return res.status(400).json({ msg: "Admin Already Registered" });

        const passwordHash = await bcrypt.hash(password, 10);

        const adminReg = new Admin({
            email,
            password: passwordHash
        });

        await adminReg.save();

        res.json({ msg: "Admin Registered Successfully" });

    } catch (err) {
        res.status(500).json({ msg: "Server Error", error: err.message });
    }
});

// Login Admin
routes.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        const data = await Admin.findOne({ email });
        if (!data) return res.status(404).json({ msg: "Email Not Matched" });

        const isMatch = await bcrypt.compare(password, data.password);
        if (!isMatch) return res.status(400).json({ msg: "Password Not Matched" });

        const token = jwt.sign(
            { id: data._id, role: 'Admin' },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );

        res.json({
            msg: "Login Successfully",
            token,
            role: "Admin",
            id: data._id
        });

    } catch (err) {
        res.status(500).json({ msg: "Try again later" });
    }
});

module.exports = routes;