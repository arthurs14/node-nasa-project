const axios = require("axios");

const launchesDatabase = require("./launches.mongo");
const planets = require("./planets.mongo");

// CONSTANTS
const DEFAULT_FLIGHT_NUMBER = 100;

// LAUNCH DATA
const launch = {
  flightNumber: 100, // flight_number
  mission: "Kepler Exploration X", // name
  rocket: "Explorer IS1", // rocket.name
  launchDate: new Date("December 27, 2030"), // date_local
  target: "Kepler-442 b", // not applicable
  customers: ["ZTM", "NASA"], // payload.customers
  upcoming: true, // upcoming
  success: true, // success
};

saveLaunch(launch);

async function populateLaunches() {
  try {
    const response = await axios.post(process.env.SPACEX_API_URL, {
      query: {},
      options: {
        pagination: false,
        populate: [
          {
            path: "rocket",
            select: {
              name: 1,
            },
          },
          {
            path: "payloads",
            select: {
              customers: 1,
            },
          },
        ],
      },
    });

    const launchDocs = response.data.docs;

    for (const launchDoc of launchDocs) {
      const payloads = launchDoc.payloads;
      const customers = payloads.flatMap((payload) => payload.customers);

      const launch = {
        flightNumber: launchDoc.flight_number,
        mission: launchDoc.name,
        rocket: launchDoc.rocket.name,
        launchData: launchDoc.date_local,
        // target: "",
        customers,
        upcoming: launchDoc.upcoming,
        success: launchDoc.success,
      };

      console.log(`${launch.flightNumber} ${launch.mission}`);

      // TODO: populate launches collection ...
    }
  } catch (e) {
    console.error(`Could not populate launches from API - ${e}`);
  }
}

async function loadLaunchData() {
  try {
    console.log("Downloading launch data...");

    const firstLaunch = await findLaunch({
      flightNumber: 1,
      rocket: "Falcon 1",
      mission: "FalconSat",
    });

    if (firstLaunch) {
      console.log("Launch data already loaded!");
    } else {
      await populateLaunches();
    }
  } catch (e) {
    console.error(`Cannot load launch data from API - ${e}`);
  }
}

async function findLaunch(filter) {
  try {
    return await launchesDatabase.findOne(filter);
  } catch (e) {
    console.error(`Could not find launch - ${e}`);
  }
}

async function launchExists(launchId) {
  try {
    return await findLaunch({ flightNumber: launchId });
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
  loadLaunchData,
  launchExists,
  getAllLaunches,
  scheduleNewLaunch,
  abortLaunch,
};
