const Complaint = require("../model/Complaint");

// GET - Student ki apni complaints
const getStudentComplaints = async (req, res) => {
    try {
        const data = await Complaint.find({
            studentId: req.params.studentId
        })
        .populate('complaintType', 'name')
        .sort({ createdAt: -1 });

        res.json({ msg: "Fetched", data });

    } catch (err) {
        console.log(err);
        res.status(500).json({
            msg: "Error fetching student complaints",
            error: err.message
        });
    }
};

// GET - Sabhi complaints (admin)
const getAllComplaints = async (req, res) => {
    try {
        const data = await Complaint.find()
            .populate('studentId', 'name email mobile course enrollment')
            .populate('complaintType', 'name')
            .sort({ createdAt: -1 });

        res.json({ msg: "Complaint fetched", data });

    } catch (err) {
        res.status(500).json({ msg: "Error fetching complaints" });
    }
};

// POST - Nayi complaint
const addComplaint = async (req, res) => {
    try {
        const { complaintType, complaintText, studentId } = req.body;

        if (!complaintText || !studentId) {
            return res.status(400).json({ msg: "complaintText aur studentId required hai" });
        }

        const data = new Complaint({
            complaintType: complaintType || null,
            complaintText,
            studentId
        });

        await data.save();
        await data.populate('complaintType', 'name');

        res.json({ msg: "Complaint added successfully", data });

    } catch (err) {
        console.error("POST /complaint error:", err.message);
        res.status(500).json({ msg: "Complaint not added", error: err.message });
    }
};

// PATCH - Status + adminResponse update (admin)
const updateComplaint = async (req, res) => {
    try {
        const { status, adminResponse } = req.body;

        const updated = await Complaint.findByIdAndUpdate(
            req.params.id,
            { status, adminResponse },
            { new: true }
        );

        if (!updated) {
            return res.status(404).json({ msg: "Complaint nahi mili" });
        }

        res.json({ msg: "Complaint updated successfully", data: updated });

    } catch (err) {
        console.log(err.message);
        res.status(500).json({ msg: "Update failed" });
    }
};

// DELETE
const deleteComplaint = async (req, res) => {
    try {
        const data = await Complaint.findByIdAndDelete(req.params.id);

        if (!data) return res.status(404).json({ msg: "Complaint nahi mili" });

        res.json({ msg: "Complaint deleted successfully" });

    } catch (err) {
        res.status(500).json({ msg: "Complaint not deleted", error: err.message });
    }
};

module.exports = {
    getStudentComplaints,
    getAllComplaints,
    addComplaint,
    updateComplaint,
    deleteComplaint
};