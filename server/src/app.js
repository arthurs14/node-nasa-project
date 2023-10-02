// Packages
const path = require("path");
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

// File Imports
const planetsRouter = require("./routes/planets/planets.router");
const launchesRouter = require("./routes/launches/launches.router");

/* --- START OF FILE --- */
const app = express();

// MIDDLEWARE
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);
app.use(morgan("combined"));
app.use(express.json());
app.use(express.static(path.join(__dirname, "..", "public")));

// ROUTES
app.use("/planets", planetsRouter);
app.use("/launches", launchesRouter);
app.get("/*", (req, res) =>
  res.sendFile(path.join(__dirname, "..", "public", "index.html"))
);

module.exports = app;
