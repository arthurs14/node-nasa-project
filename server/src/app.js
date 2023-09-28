// Packages
const express = require("express");
const cors = require("cors");

// File Imports
const planetsRouter = require("./routes/planets/planets.router");

/* --- START OF FILE --- */
const app = express();

// MIDDLEWARE
app.use(cors());
app.use(express.json());

// ROUTES
app.use(planetsRouter);

module.exports = app;
