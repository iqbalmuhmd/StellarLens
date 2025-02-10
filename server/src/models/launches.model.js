const launchesDB = require("./launches.mongo");
const planets = require("./planets.mongo");

const launches = new Map();

let DEFAULT_FLIGHT_NO = 100;

const launch = {
  flightNumber: 100,
  mission: "Kepler Exploration X",
  rocket: "Explorer IS1",
  launchDate: new Date("December 27, 2028"),
  target: "Kepler-296 e",
  customers: ["Elon", "NASA"],
  upcoming: true,
  success: true,
};

saveLaunch(launch);

async function saveLaunch(launch) {
  const planet = await planets.findOne({
    keplerName: launch.target,
  });

  if (!planet) {
    throw new Error("No matching planet found!");
  }

  await launchesDB.findOneAndUpdate(
    {
      flightNumber: launch.flightNumber,
    },
    launch,
    {
      upsert: true,
    }
  );
}

async function getLatestFlightNumber() {
  const latestLaunch = await launchesDB.findOne().sort("-flightNumber");

  if (!latestLaunch.flightNumber) {
    return DEFAULT_FLIGHT_NO;
  }

  return latestLaunch.flightNumber;
}

async function existsLaunchWithId(id) {
  return await launchesDB.findOne({
    flightNumber: id,
  });
}

async function getAllLaunches() {
  return await launchesDB.find({}, { _id: 0, __v: 0 });
}

async function scheduleNewLaunch(launch) {
  const newFlightNumber = (await getLatestFlightNumber()) + 1;

  const newLaunch = Object.assign(launch, {
    success: true,
    upcoming: true,
    customers: ["Iqbal", "Haneen"],
    flightNumber: newFlightNumber,
  });

  saveLaunch(newLaunch);
}

async function abortLaunchById(id) {
  const aborted = await launchesDB.updateOne(
    {
      flightNumber: id,
    },
    {
      upcoming: false,
      success: false,
    }
  );

  return aborted.ok === 1 && aborted.nModified === 1;
}

module.exports = {
  getAllLaunches,
  scheduleNewLaunch,
  existsLaunchWithId,
  abortLaunchById,
};
