const {
  getAllLaunches,
  scheduleNewLaunch,
  existsLaunchWithId,
  abortLaunchById,
} = require("../../models/launches.model");

async function httpGetAllLaunches(req, res) {
  return res.status(200).json(await getAllLaunches());
}

function httpAddNewLaunch(req, res) {
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

  const launchDate = new Date(launch.launchDate);

  if (isNaN(launchDate)) {
    return res.status(400).json({
      error: "Invalid launch date",
    });
  }

  const newLaunch = {
    ...launch,
    launchDate,
  };

  scheduleNewLaunch(newLaunch);
  return res.status(201).json(newLaunch);
}

async function httpAbortLaunch(req, res) {
  const id = Number(req.params.id);

  const existingLaunchId = await existsLaunchWithId(id);

  if (!existingLaunchId) {
    return res.status(404).json({
      error: "Launch not found",
    });
  }
  const aborted = await abortLaunchById(id);

  if (!aborted) {
    return res.status(400).json({
      error: "Launch not aborted!",
    });
  }

  return res.status(200).json({
    ok: true,
  });
}

module.exports = {
  httpGetAllLaunches,
  httpAddNewLaunch,
  httpAbortLaunch,
};
