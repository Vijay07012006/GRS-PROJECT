const express = require("express");
const routes = express.Router();
const UserLog = require("../model/userLog");

// GET - all logs (admin ke liye)
routes.get("/", async (req, res) => {
  try {
    const logs = await UserLog.find()
      .sort({ createdAt: -1 }); // latest pehle
    res.json({ msg: "Logs fetched", data: logs });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Logs fetch nahi hue" });
  }
});

// POST - log entry banao (login/logout pe call hoga)
routes.post("/", async (req, res) => {
  try {
    const { userId, userName, userEmail, action, ipAddress } = req.body;
    const log = new UserLog({ userId, userName, userEmail, action, ipAddress });
    await log.save();
    res.json({ msg: "Log saved" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Log save nahi hua" });
  }
});

module.exports = routes;