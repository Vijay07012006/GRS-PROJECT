const express = require("express");
const routes = express.Router();
const Complaint = require("../model/Complaint");

// ✅ IMPORTANT: /student/:studentId SABSE PEHLE — warna /:id match kar leta hai

// GET - student ki apni complaints
routes.get('/student/:studentId', async (req, res) => {
    try {
        const data = await Complaint.find({ studentId: req.params.studentId })
            .populate('complaintType', 'name')
            .sort({ createdAt: -1 });
        res.json({ msg: "Fetched", data: data });
    } catch (err) {
        res.status(500).json({ msg: "Error fetching student complaints" });
    }
});

// GET - sabhi complaints (admin)
routes.get('/', async (req, res) => {
    try {
        const data = await Complaint.find()
            .populate('studentId', 'name email mobile course enrollment')
            .populate('complaintType', 'name')
            .sort({ createdAt: -1 });
        res.json({ msg: "Complaint fetched", data: data });
    } catch (err) {
        res.status(500).json({ msg: "Error fetching complaints" });
    }
});

// POST - nayi complaint
routes.post('/', async (req, res) => {
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

        // Save ke baad populate karo taaki frontend ko category name mile
        await data.populate('complaintType', 'name');

        res.json({ msg: "Complaint added successfully", data: data });

    } catch (err) {
        console.error("POST /complaint error:", err.message);
        res.status(500).json({ msg: "Complaint not added", error: err.message });
    }
});

// PATCH - status + adminResponse update (admin)
// ✅ FIX: Admin "closed" bheje ya "resolved" — dono properly save honge
routes.patch('/:id', async (req, res) => {
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
});

// DELETE
routes.delete('/:id', async (req, res) => {
    try {
        const data = await Complaint.findByIdAndDelete(req.params.id);
        if (!data) return res.status(404).json({ msg: "Complaint nahi mili" });
        res.json({ msg: "Complaint deleted successfully" });
    } catch (err) {
        res.status(500).json({ msg: "Complaint not deleted", error: err.message });
    }
});

module.exports = routes;