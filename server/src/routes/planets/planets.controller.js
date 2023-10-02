const { getAllPlanets } = require("../../models/planets.model");

function httpGetAllPlanets(req, res) {
  try {
    return res.status(200).json(getAllPlanets());
  } catch (e) {
    res.status(400).json({ status: "fail", message: e });
  }
}

module.exports = { httpGetAllPlanets };
