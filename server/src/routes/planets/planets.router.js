// Package Imports
const express = require("express");

// File Imports
const { getAllPlanets } = require("./planets.controller");

const planetsRouter = express.Router();

planetsRouter.get("/planets", getAllPlanets);

module.exports = planetsRouter;
