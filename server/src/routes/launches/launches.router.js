// Package Imports
const express = require("express");

// File Imports
const { httpGetAllLaunches } = require("./launches.controller");

const launchesRouter = express.Router();

launchesRouter.get("/launches", httpGetAllLaunches);

module.exports = launchesRouter;
