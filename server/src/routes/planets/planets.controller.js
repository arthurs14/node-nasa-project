const { getAllPlanets } = require("../../models/planets.model");

async function httpGetAllPlanets(req, res) {
  try {
    return res.status(200).json(await getAllPlanets());
  } catch (e) {
    res.status(400).json({ status: "fail", message: e });
  }
}

module.exports = { httpGetAllPlanets };
