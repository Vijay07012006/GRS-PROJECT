
const express = require('express');
const routes = express.Router();
const {
    createComplaintType,
    getComplaintTypes,
    updateComplaintType,
    deleteComplaintType
} = require('../Controllers/complaintTypeController');

// CREATE
routes.post('/', createComplaintType);

// READ
routes.get('/', getComplaintTypes);

// UPDATE
routes.put('/:id', updateComplaintType);

// DELETE
routes.delete('/:id', deleteComplaintType);

module.exports = routes;