const Collage = require("../model/collage");

// ==========================
// Get All Colleges
// ==========================
exports.getAllCollages = async (req, res) => {
  try {
    const data = await Collage.find();
    res.json({
      msg: "collage fetched",
      data: data,
    });

  } catch (err) {
    console.log(err);

    res.status(500).json({
      msg: "collage not fetched",
    });
  }
};

// ==========================
// Add College
// ==========================
exports.addCollage = async (req, res) => {
  try {
    const { name, code, location } = req.body;

    const data = new Collage({
      name,
      code,
      location,
    });

    await data.save();

    res.json({
      msg: "collage is added successfully",
    });

  } catch (err) {
    console.log(err);

    res.status(500).json({
      msg: err.message || "collage not added",
    });
  }
};

// ==========================
// Update College
// ==========================
exports.updateCollage = async (req, res) => {
  try {
    const data = await Collage.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!data) {
      return res.status(404).json({
        msg: "collage not found",
      });
    }

    res.json({
      msg: "collage updated successfully",
      data,
    });

  } catch (err) {
    console.log(err);

    res.status(500).json({
      msg: "collage not updated",
    });
  }
};

// ==========================
// Delete College
// ==========================
exports.deleteCollage = async (req, res) => {
  try {
    const data = await Collage.findByIdAndDelete(req.params.id);

    if (!data) {
      return res.status(404).json({
        msg: "collage not found",
      });
    }

    res.json({
      msg: "collage deleted successfully",
    });

  } catch (err) {
    console.log(err);

    res.status(500).json({
      msg: "collage not delete",
    });
  }
};