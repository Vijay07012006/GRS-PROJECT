const express = require('express');
const routes = express.Router();
const ComplaintType = require('../model/ComplaintType');

// CREATE
routes.post('/', async (req, res) => {
    try {
        const { name, description } = req.body;

        const data = await ComplaintType.findOne({ name });
        if (data) {
            return res.json({ msg: "Complaint Type already Exist" });
        }

        const saveComplaint = new ComplaintType({ name, description });
        await saveComplaint.save();

        res.json({ msg: "Complaint type added successfully", data: saveComplaint });

    } catch (err) {
        console.log(err);
        res.json({ msg: "Complaint type not added" });
    }
});

// READ
routes.get('/', async (req, res) => {
    try {
        const data = await ComplaintType.find().lean();
        res.json(data);   // ✅ fixed

    } catch (err) {
        console.log(err);
        res.json({ msg: "Complaint type not fetched" });
    }
});

// UPDATE
routes.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const updated = await ComplaintType.findByIdAndUpdate(
            id,
            req.body,
            { new: true }
        );

        res.json({ msg: "Complaint type updated", data: updated });

    } catch (err) {
        console.log(err);
        res.json({ msg: "Complaint type not updated" });
    }
});

// DELETE
routes.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;

        await ComplaintType.findByIdAndDelete(id);

        res.json({ msg: "Complaint type deleted" });

    } catch (err) {
        console.log(err);
        res.json({ msg: "Complaint type not deleted" });
    }
});

module.exports = routes;