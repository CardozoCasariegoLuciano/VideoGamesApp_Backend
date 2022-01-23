const dotenv = require("dotenv");
dotenv.config();

const config = {
  APP_PORT: process.env.APP_PORT || 3500,
  DATABASE: process.env.DATABASE || "mongodb://localhost/videojuegosreact",
  DATABASE_TEST: process.env.DATABASE_TEST || "mongodb://localhost/videojuegosreactTEST",
};

module.exports = config;
