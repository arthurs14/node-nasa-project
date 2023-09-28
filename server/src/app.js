// Packages
const express = require("express");

// Local File Imports
const planetsRouter = require("./routes/planets/planets.router");

/* --- START OF FILE --- */
const app = express();

// MIDDLEWARE
app.use(express.json());

// ROUTES
app.use(planetsRouter);

module.exports = app;
