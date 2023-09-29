// Package Imports
const express = require("express");

// File Imports
const { getAllLaunches } = require("./launches.controller");

const launchesRouter = express.Router();

launchesRouter.get("/launches", getAllLaunches);

module.exports = launchesRouter;
