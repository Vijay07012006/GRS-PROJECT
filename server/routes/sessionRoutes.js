const express = require("express");
const routes = express.Router();
const Session = require("../model/session");

// GET all sessions
routes.get("/", async (req, res) => {
  try {
    const data = await Session.find();
    res.json({ msg: "Session fetched", data: data });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Session not fetched" });
  }
});

// POST - add session
routes.post("/", async (req, res) => {
  try {
    const { name, description } = req.body;
    if (!name) return res.status(400).json({ msg: "Name required hai" });
    const data = new Session({ name, description });
    await data.save();
    res.json({ msg: "Session added successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: err.message || "Session not added" });
  }
});

// PATCH - close/update session
routes.patch("/:id", async (req, res) => {
  try {
    await Session.findByIdAndUpdate(req.params.id, req.body);
    res.json({ msg: "Session updated successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Session not updated" });
  }
});

// DELETE - delete session
routes.delete("/:id", async (req, res) => {
  try {
    await Session.findByIdAndDelete(req.params.id);
    res.json({ msg: "Session deleted successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Session not deleted" });
  }
});

module.exports = routes;