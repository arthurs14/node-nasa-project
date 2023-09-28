const planets = require("../../models/planets.model");

function getAllPlanets(req, res) {
  try {
    return res.status(200).json(planets);
  } catch (e) {
    res.status(400).json({ status: "fail", message: e });
  }
}

module.exports = { getAllPlanets };
