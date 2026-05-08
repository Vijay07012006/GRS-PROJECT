const express = require("express");
const routes = express.Router();
const Collage = require("../model/collage"); // ✅ 2 fixes: small 'Collage' + 'models' not 'model'

// Get all colleges
routes.get('/', async (req, res) => {
  try {
    const data = await Collage.find();
    res.json({ msg: "collage fetched", data: data });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "collage not fetched" });
  }
});

// Post - add college
routes.post('/', async (req, res) => {
  try {
    const { name, code, location } = req.body;  // ✅ description → code, location
    const data = new Collage({ name, code, location });
    await data.save();
    res.json({ msg: "collage is added successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: err.message || "collage not added" });
  }
});

// Patch - update college
routes.patch('/:id', async (req, res) => {
  try {
    const data = await Collage.findByIdAndUpdate(req.params.id, req.body);
    res.json({ msg: "collage updated successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "collage not updated" });
  }
});

// Delete college
routes.delete('/:id', async (req, res) => {
  try {
    const data = await Collage.findByIdAndDelete(req.params.id);
    res.json({ msg: "collage delete successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "collage not delete" });
  }
});

module.exports = routes;
