const { getAllLaunches, addNewLaunch } = require("../../models/launches.model");

function httpGetAllLaunches(req, res) {
  return res.status(200).json(getAllLaunches());
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

  addNewLaunch(newLaunch);
  return res.status(201).json(newLaunch);
}

module.exports = {
  httpGetAllLaunches,
  httpAddNewLaunch,
};
