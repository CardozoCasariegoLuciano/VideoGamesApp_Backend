const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const config = require("./config");

require("./database")
const app = express();

//Configs
app.set("port", config.APP_PORT);

//Midlewares
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());

//routes
app.use("/api/category", require("./routes/category.route"))
app.use("/api/videogames", require("./routes/videogames.routes"))

module.exports = app;
