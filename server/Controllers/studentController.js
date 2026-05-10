
const Student = require("../model/student");
const UserLog = require("../model/userLog");
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

        // Log save karo
        try {
            await UserLog.create({
                userId: student._id,
                userName: student.name,
                userEmail: student.email,
                action: "login",
                ipAddress: req.headers['x-forwarded-for'] || req.socket.remoteAddress || "unknown"
            });
        } catch (logErr) {
            console.log("Log save nahi hua:", logErr.message);
        }

        res.json({ 
            msg: "Login successful", 
            token,
            studentId: student._id,
            name: student.name,
            email: student.email
        });

    } catch (err) {
        res.status(500).json({ msg: "Server error" });
    }
};
// UPDATE PROFILE
const updateProfile = async (req, res) => {
    try {
        const { studentId, name } = req.body;
        if (!studentId || !name) {
            return res.status(400).json({ msg: "studentId aur name required hai" });
        }
        await Student.findByIdAndUpdate(studentId, { name });
        res.json({ msg: "Profile updated successfully" });
    } catch (err) {
        res.status(500).json({ msg: "Profile update nahi ho saka", error: err.message });
    }
};

// CHANGE PASSWORD
const changePassword = async (req, res) => {
    try {
        const { studentId, oldPassword, newPassword } = req.body;
        if (!studentId || !oldPassword || !newPassword) {
            return res.status(400).json({ msg: "Sab fields required hain" });
        }
        const student = await Student.findById(studentId);
        if (!student) {
            return res.status(404).json({ msg: "Student nahi mila" });
        }
        const isMatch = await bcrypt.compare(oldPassword, student.password);
        if (!isMatch) {
            return res.status(400).json({ msg: "Purana password galat hai" });
        }
        student.password = await bcrypt.hash(newPassword, 10);
        await student.save();
        res.json({ msg: "Password changed successfully" });
    } catch (err) {
        res.status(500).json({ msg: "Password change nahi ho saka", error: err.message });
    }
};

module.exports = {
    getStudents,
    registerStudent,
    loginStudent,
    updateProfile,
    changePassword
};