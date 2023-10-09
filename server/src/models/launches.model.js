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

async function launchExists(launchId) {
  try {
    return await launchesDatabase.findOne({ flightNumber: launchId });
  } catch (e) {
    console.error(`Could not check if launch exists - ${e}`);
  }
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

async function abortLaunch(launchId) {
  try {
    const aborted = await launchesDatabase.updateOne(
      { flightNumber: launchId },
      { upcoming: false, success: false }
    );

    return aborted.modifiedCount === 1;
  } catch (e) {
    console.error(`Could not abort launch - ${e}`);
  }
}

module.exports = {
  launchExists,
  getAllLaunches,
  scheduleNewLaunch,
  abortLaunch,
};
