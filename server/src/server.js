// Packages
const http = require("http");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

// File Imports
const app = require("./app");
const { loadPlanetsData } = require("./models/planets.model");

// ENVIRONMENT VARIABLES
dotenv.config({ path: "../config.env" });

/* --- START OF FILE --- */
const PORT = process.env.PORT || 8000;

const MONGO_URL = process.env.DATABASE.replace(
  "<password>",
  process.env.DB_PASSWORD
);

const server = http.createServer(app);

mongoose.connection.once("open", () =>
  console.log("MongoDB connection ready!")
);

mongoose.connection.on("error", (err) => console.error(err));

async function startServer() {
  await mongoose.connect(MONGO_URL);

  await loadPlanetsData();

  server.listen(PORT, () => console.log(`Listening on port ${PORT}...`));
}

startServer();
