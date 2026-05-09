const ComplaintType = require('../model/ComplaintType');

// CREATE
const createComplaintType = async (req, res) => {
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
};

// READ
const getComplaintTypes = async (req, res) => {
    try {
        const data = await ComplaintType.find().lean();
        res.json(data);
    } catch (err) {
        console.log(err);
        res.json({ msg: "Complaint type not fetched" });
    }
};

// UPDATE
const updateComplaintType = async (req, res) => {
    try {
        const updated = await ComplaintType.findByIdAndUpdate(
            req.params.id, req.body, { new: true }
        );
        res.json({ msg: "Complaint type updated", data: updated });
    } catch (err) {
        console.log(err);
        res.json({ msg: "Complaint type not updated" });
    }
};

// DELETE
const deleteComplaintType = async (req, res) => {
    try {
        await ComplaintType.findByIdAndDelete(req.params.id);
        res.json({ msg: "Complaint type deleted" });
    } catch (err) {
        console.log(err);
        res.json({ msg: "Complaint type not deleted" });
    }
};

module.exports = {
    createComplaintType,
    getComplaintTypes,
    updateComplaintType,
    deleteComplaintType
};