// Packages
const express = require("express");
const cors = require("cors");

// File Imports
const planetsRouter = require("./routes/planets/planets.router");

/* --- START OF FILE --- */
const app = express();

// MIDDLEWARE
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);
app.use(express.json());

// ROUTES
app.use(planetsRouter);

module.exports = app;
