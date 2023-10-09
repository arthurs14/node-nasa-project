const {
  launchExists,
  getAllLaunches,
  scheduleNewLaunch,
  abortLaunch,
} = require("../../models/launches.model");

async function httpGetAllLaunches(req, res) {
  try {
    return res.status(200).json(await getAllLaunches());
  } catch (e) {
    res.status(400).json({ status: "fail", message: e });
  }
}

function httpAddNewLaunch(req, res) {
  try {
    const launch = req.body;

    if (
      !launch.mission ||
      !launch.rocket ||
      !launch.launchDate ||
      !launch.target
    ) {
      return res.status(400).json({
        error: "Missing required launch property",
      });
    }

    launch.launchDate = new Date(launch.launchDate);

    if (isNaN(launch.launchDate)) {
      return res.status(400).json({ error: "Invalid launch date" });
    }

    scheduleNewLaunch(launch);

    console.log(launch);

    return res.status(201).json(launch);
  } catch (e) {
    res.status(400).json({ status: "fail", message: e });
  }
}

async function httpAbortLaunch(req, res) {
  try {
    const launchId = Number(req.params.id);

    const existsLaunch = await launchExists(launchId);

    if (!existsLaunch) {
      return res.status(404).json({ error: "Launch not found" });
    }

    const aborted = await abortLaunch(launchId);

    if (!aborted) {
      return res.status(400).json({ error: "Launch not aborted" });
    }

    return res.status(200).json({ ok: true });
  } catch (e) {
    res.status(400).json({ status: "fail", message: e });
  }
}

module.exports = { httpGetAllLaunches, httpAddNewLaunch, httpAbortLaunch };
