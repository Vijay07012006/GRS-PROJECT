
const Student = require("../model/student");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// GET all students
const getStudents = async (req, res) => {
    try {
        const data = await Student.find().select('-password');
        res.json({ msg: "Student fetched", data });
    } catch (err) {
        res.status(500).json({ msg: "Fetch nahi hua", error: err.message });
    }
};

// REGISTER
const registerStudent = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ msg: "All fields required" });
        }

        const exist = await Student.findOne({ email });
        if (exist) {
            return res.status(400).json({ msg: "Email already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const student = new Student({
            ...req.body,
            password: hashedPassword,
        });

        await student.save();

        res.status(201).json({
            msg: "Student added successfully",
            studentId: student._id,
            name: student.name
        });

    } catch (err) {
        res.status(500).json({ msg: "Student not added" });
    }
};

// LOGIN
const loginStudent = async (req, res) => {
    try {
        const { email, password } = req.body;

        const student = await Student.findOne({
            $or: [{ email }, { mobile: email }]
        });

        if (!student) {
            return res.status(404).json({ msg: "User nahi mila" });
        }

        const isMatch = await bcrypt.compare(password, student.password);
        if (!isMatch) {
            return res.status(400).json({ msg: "Password galat hai" });
        }

        const token = jwt.sign(
            { id: student._id, role: "Student" },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );

        res.json({ msg: "Login successful", token });

    } catch (err) {
        res.status(500).json({ msg: "Server error" });
    }
};

module.exports = {
    getStudents,
    registerStudent,
    loginStudent
};