const launchesDatabase = require("./launches.mongo");
const planets = require("./planets.mongo");

const DEFAULT_FLIGHT_NUMBER = 100;

// LAUNCH DATA
const launch = {
  flightNumber: 100,
  mission: "Kepler Exploration X",
  rocket: "Explorer IS1",
  launchDate: new Date("December 27, 2030"),
  target: "Kepler-442 b",
  customers: ["ZTM", "NASA"],
  upcoming: true,
  success: true,
};

saveLaunch(launch);

function launchExists(launchId) {
  return launches.has(launchId);
}

async function getLatestFlightNumber() {
  try {
    const latestLaunch = await launchesDatabase.findOne().sort("-flightNumber");

    if (!latestLaunch) {
      return DEFAULT_FLIGHT_NUMBER;
    }

    return latestLaunch.flightNumber;
  } catch (e) {
    console.error(`No latest launch - ${e}`);
  }
}

async function getAllLaunches() {
  try {
    return await launchesDatabase.find({}, { _id: 0, __v: 0 });
  } catch (e) {
    console.error(`Could not get all launches ${e}`);
  }
}

async function saveLaunch(launch) {
  try {
    const planet = await planets.findOne({ keplerName: launch.target });

    if (!planet) {
      throw new Error("No matching planet found");
    }

    await launchesDatabase.updateOne(
      {
        flightNumber: launch.flightNumber,
      },
      launch,
      { upsert: true }
    );
  } catch (e) {
    console.error(`Could not save launch - ${e}`);
  }
}

async function scheduleNewLaunch(launch) {
  try {
    const newFlightNumber = (await getLatestFlightNumber()) + 1;

    const newLaunch = Object.assign(launch, {
      flightNumber: newFlightNumber,
      success: true,
      upcoming: true,
      customers: ["Zero to Master", "NASAS"],
    });

    await saveLaunch(newLaunch);
  } catch (e) {
    console.error(`Could not schedule new launch - ${e}`);
  }
}

function abortLaunch(launchId) {
  const aborted = launches.get(launchId);
  aborted.upcoming = false;
  aborted.success = false;
  return aborted;
}

module.exports = {
  launchExists,
  getAllLaunches,
  scheduleNewLaunch,
  abortLaunch,
};
