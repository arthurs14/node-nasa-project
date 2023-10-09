const launchesDatabase = require("./launches.mongo");

let latestFlightNumber = 100;

// LAUNCH DATA
const launch = {
  flightNumber: 100,
  mission: "Kepler Exploration X",
  rocket: "Explorer IS1",
  launchDate: new Date("December 27, 2030"),
  target: "Kepler-422 b",
  customers: ["ZTM", "NASA"],
  upcoming: true,
  success: true,
};

saveLaunch(launch);

function launchExists(launchId) {
  return launches.has(launchId);
}

async function getAllLaunches() {
  try {
    // return Array.from(launches.values());
    return await launchesDatabase.find({}, { _id: 0, __v: 0 });
  } catch (e) {
    console.error(`Could not get all launches ${e}`);
  }
}

async function saveLaunch(launch) {
  try {
    await launchesDatabase.updateOne(
      {
        flightNumber: launch.flightNumber,
      },
      launch,
      { upsert: true }
    );
  } catch (e) {
    console.error(`Could not save launch ${e}`);
  }
}

function addNewLaunch(launch) {
  latestFlightNumber++;
  launches.set(
    latestFlightNumber,
    Object.assign(launch, {
      flightNumber: latestFlightNumber,
      upcoming: true,
      success: true,
      customers: ["Zero to Mastery", "NASA"],
    })
  );
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
  addNewLaunch,
  abortLaunch,
};
