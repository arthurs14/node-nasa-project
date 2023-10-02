// Package Imports
const express = require("express");

// File Imports
const {
  httpGetAllLaunches,
  httpAddNewLaunch,
} = require("./launches.controller");

const launchesRouter = express.Router();

launchesRouter.get("/launches", httpGetAllLaunches);
launchesRouter.post("/launches", httpAddNewLaunch);

module.exports = launchesRouter;
