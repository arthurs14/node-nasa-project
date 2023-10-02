// Package Imports
const express = require("express");

// File Imports
const { httpGetAllPlanets } = require("./planets.controller");

const planetsRouter = express.Router();

planetsRouter.get("/planets", httpGetAllPlanets);

module.exports = planetsRouter;
