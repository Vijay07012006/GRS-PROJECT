
const express = require("express");
const routes = express.Router();
const {
    getSessions,
    createSession,
    updateSession,
    deleteSession
} = require("../Controllers/sessionController");

// GET all sessions
routes.get("/", getSessions);

// POST add session
routes.post("/", createSession);

// PATCH update session
routes.patch("/:id", updateSession);

// DELETE session
routes.delete("/:id", deleteSession);

module.exports = routes;