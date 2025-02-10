const http = require("http");
const app = require("./app");
const mongoose = require("mongoose");
const { loadPlanetsData } = require("./models/planets.model");

const PORT = 8000;

const MONGO_URL =
  "mongodb+srv://stellarlens-api:se52ZH5w3Hf4Njhr@stellarlens.iih8f.mongodb.net/stellarlens?retryWrites=true&w=majority&appName=stellarlens";

const server = http.createServer(app);

mongoose.connection.once("open", () => {
  console.log("MongoDB connection is Started");
});

mongoose.connection.on("error", (err) => {
  console.error(err);
});

async function startServer() {
  await mongoose.connect(MONGO_URL);
  await loadPlanetsData();

  server.listen(PORT, () => {
    console.log(`Listening to PORT: ${PORT}...`);
  });
}

startServer();
