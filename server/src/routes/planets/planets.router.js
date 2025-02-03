const express = require("express");

const { httpGetAllPlanets } = require("./planets.controllers");

const planetRouter = express.Router();

planetRouter.get("/", httpGetAllPlanets);

module.exports = planetRouter;
