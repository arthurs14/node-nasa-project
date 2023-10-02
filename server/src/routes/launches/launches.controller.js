const { getAllLaunches } = require("../../models/launches.model");

function httpGetAllLaunches(req, res) {
  try {
    return res.status(200).json(getAllLaunches());
  } catch (e) {
    res.status(400).json({ status: "fail", message: e });
  }
}

module.exports = { httpGetAllLaunches };
