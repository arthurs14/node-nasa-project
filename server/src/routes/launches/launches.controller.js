const { getAllLaunches, addNewLaunch } = require("../../models/launches.model");

function httpGetAllLaunches(req, res) {
  try {
    return res.status(200).json(getAllLaunches());
  } catch (e) {
    res.status(400).json({ status: "fail", message: e });
  }
}

function httpAddNewLaunch(req, res) {
  try {
    const launch = req.body;

    launch.launchDate = new Date(launch.launchDate);

    addNewLaunch(launch);

    return res.status(201).json(launch);
  } catch (e) {
    res.status(400).json({ status: "fail", message: e });
  }
}

module.exports = { httpGetAllLaunches, httpAddNewLaunch };
