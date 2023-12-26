if (process.env.NODE_ENV != "production") {
  require("dotenv").config();
}
const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

const DB_URL = process.env.ATLASDB_URL;
main()
  .then(() => {
    console.log("connected to DB");
  })
  .catch((err) => console.log(err));

async function main() {
  //   await mongoose.connect(MONGO_URL);
  await mongoose.connect(DB_URL);
}

const initDB = async () => {
  await Listing.deleteMany({});
  initData.data = initData.data.map((obj) => ({
    ...obj,
    owner: "658a98da9c34a6508e1c7b89",
  }));
  await Listing.insertMany(initData.data);
  console.log("data was initialized");
};
initDB();
