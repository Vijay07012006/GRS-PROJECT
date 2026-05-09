
const express = require("express");
const routes = express.Router();
const {
    getLogs,
    createLog
} = require("../Controllers/userLogController");

// GET all logs
routes.get("/", getLogs);

// POST log entry
routes.post("/", createLog);

module.exports = routes;