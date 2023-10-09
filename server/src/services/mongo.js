const dotenv = require("dotenv");
const mongoose = require("mongoose");

// ENVIRONMENT VARIABLES
dotenv.config({ path: "../config.env" });

const MONGO_URL = process.env.DATABASE.replace(
  "<password>",
  process.env.DB_PASSWORD
);

mongoose.connection.once("open", () =>
  console.log("MongoDB connection ready!")
);

mongoose.connection.on("error", (err) => console.error(err));

async function mongoConnect() {
  await mongoose.connect(MONGO_URL);
}

async function mongoDisconnect() {
  await mongoose.disconnect();
}

module.exports = {
  mongoConnect,
  mongoDisconnect,
};
