const Collage = require('../model/collageModel');

// Get all colleges
const getAllColleges = async (req, res) => {
  try {
    const colleges = await Collage.find();
    res.status(200).json({ success: true, data: colleges });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Create college
const createCollege = async (req, res) => {
  try {
    const { code, name, location } = req.body;

    if (!code || !name) {
      return res.status(400).json({ success: false, message: "Code and name are required" });
    }

    const college = await Collage.create({ code, name, location });
    res.status(201).json({ success: true, data: college });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Delete college
const deleteCollege = async (req, res) => {
  try {
    const college = await Collage.findByIdAndDelete(req.params.id);
    if (!college) {
      return res.status(404).json({ success: false, message: "College not found" });
    }
    res.status(200).json({ success: true, message: "College deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { getAllColleges, createCollege, deleteCollege };  