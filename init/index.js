const mongoose = require("mongoose");
const initData = require("./data.js"); //Sample data
const Listing = require("../models/listing.js"); //Schema

const MONGO_URL = "mongodb://127.0.0.1:27017/explorecache";
main()
  .then(() => {
    console.log("Connecting to DB");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(MONGO_URL);
}

const initDB = async () => {
  await Listing.deleteMany({});
  initData.data = initData.data.map((obj) => ({
    ...obj,
    owner: "657df2807971b05b498370cf",
  }));
  await Listing.insertMany(initData.data);
  console.log("Data was initalized");
};

initDB();
