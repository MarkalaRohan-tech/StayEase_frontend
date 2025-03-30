const mongoose = require("mongoose");
const initData = require("../init/data.js");
const Listing = require("../models/listing.js")

const MONGO_URL = "mongodb://127.0.0.1:27017/stayease";

main()
  .then(() => {
    console.log("Connected to StayEase DB");
  })
  .catch((e) => {
    console.log("Error:", e);
  });

async function main() {
    await mongoose.connect(MONGO_URL);
}

const initDB = async () => {
    await Listing.deleteMany({});
    await Listing.insertMany(initData.data);
    console.log("data was initialized");
}

initDB();