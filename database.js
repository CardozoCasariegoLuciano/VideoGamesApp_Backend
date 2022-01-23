const mongoose = require("mongoose");
const config = require("./config");

const URI = process.env.NODE_ENV === "test" ? config.DATABASE_TEST : config.DATABASE;

const initDB = async () => {
  try {
    mongoose.connect(URI, {});
    console.log("Data base conected");
    console.log(process.env.NODE_ENV, "environtment")
  } catch (error) {
    console.log(error);
  }
};

initDB();
