const { launches } = require("../../models/launches.model");

function getAllLaunches(req, res) {
  try {
    return res.status(200).json(Array.from(launches.values()));
  } catch (e) {
    res.status(400).json({ status: "fail", message: e });
  }
}

module.exports = { getAllLaunches };
