const ComplaintType = require('../model/ComplaintType');

// CREATE ✅
const createComplaintType = async (req, res) => {
  try {
   const { name, description } = req.body;
   
   if (!name) {
      return res.status(400).json({ msg: "Name is required" });
    }

    const existing = await ComplaintType.findOne({ name });
    if (existing) {
      return res.status(400).json({ msg: "Complaint type already exists" });
    }

   
   
   const newType = await ComplaintType.create({ name, description: description || "" });
    res.status(201).json({ msg: "Complaint type created", data: newType });

  } catch (err) {
    console.error("createComplaintType error:", err.message);
    res.status(500).json({ msg: "Server error" });
  }
};

// READ ✅
const getComplaintTypes = async (req, res) => {
  try {
    const types = await ComplaintType.find({});
    console.log("DB se types:", types);
    res.status(200).json({ msg: "Complaint types fetched", data: types });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
};

// UPDATE ✅
const updateComplaintType = async (req, res) => {
  try {
    const updated = await ComplaintType.findByIdAndUpdate(
      req.params.id, req.body, { new: true }
    );
    res.json({ msg: "Complaint type updated", data: updated });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Complaint type not updated" });
  }
};

// DELETE ✅
const deleteComplaintType = async (req, res) => {
  try {
    await ComplaintType.findByIdAndDelete(req.params.id);
    res.json({ msg: "Complaint type deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Complaint type not deleted" });
  }
};

module.exports = {
  createComplaintType,
  getComplaintTypes,
  updateComplaintType,
  deleteComplaintType
};