
const Session = require("../model/session");

// GET all sessions
const getSessions = async (req, res) => {
    try {
        const data = await Session.find().sort({ createdAt: -1 });
        res.json({ msg: "Sessions fetched", data });
    } catch (err) {
        res.status(500).json({ msg: "Fetch failed", error: err.message });
    }
};

// POST add session
const createSession = async (req, res) => {
    try {
        const data = new Session(req.body);
        await data.save();
        res.json({ msg: "Session added", data });
    } catch (err) {
        res.status(500).json({ msg: "Add failed", error: err.message });
    }
};

// PATCH update session
const updateSession = async (req, res) => {
    try {
        const data = await Session.findByIdAndUpdate(
            req.params.id, req.body, { new: true }
        );
        res.json({ msg: "Session updated", data });
    } catch (err) {
        res.status(500).json({ msg: "Update failed", error: err.message });
    }
};

// DELETE session
const deleteSession = async (req, res) => {
    try {
        await Session.findByIdAndDelete(req.params.id);
        res.json({ msg: "Session deleted" });
    } catch (err) {
        res.status(500).json({ msg: "Delete failed", error: err.message });
    }
};

module.exports = {
    getSessions,
    createSession,
    updateSession,
    deleteSession
};