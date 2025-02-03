const express = require("express");

const launchesRouter = express.Router();
const {
  httpGetAllLaunches,
  httpAddNewLaunch,
} = require("./launches.controllers");

launchesRouter.get("/", httpGetAllLaunches);
launchesRouter.post("/", httpAddNewLaunch);

module.exports = launchesRouter;
