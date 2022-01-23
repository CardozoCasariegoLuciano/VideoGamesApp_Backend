const VideoGames = require("../models/videogames.model");
const formidable = require("formidable");
const fs = require("fs");
const _ = require("lodash");
const { findById } = require("../models/videogames.model");

exports.list = async (req, res) => {
  try {
    const order = req.query.order ? req.query.order : "asc";
    const sortBy = req.query.sortBy ? req.query.sortBy : "name";

    const videoGames = await VideoGames.find()
      .select("-image")
      .populate("category")
      .sort([[sortBy, order]]);
    res.json(videoGames);
  } catch (err) {
    return res.status(400).json("Something went wrong");
  }
};

exports.create = (req, res) => {
  const form = new formidable.IncomingForm();

  form.keepExtensions = true;
  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.status(400).json("Image could no be uploaded");
    }

    const { name, description, price, category, quantity } = fields;

    if (!name || !description || !price || !category) {
      return res
        .status(400)
        .json("Name, description, price and category fields are all required");
    }

    const videogame = new VideoGames(fields);

    if (files.image) {
      if (files.image.size > 1000000) {
        return res.status(400).json("Image should be less than 1MB in size");
      }

      videogame.image.data = fs.readFileSync(files.image.filepath);
      videogame.image.contentType = files.image.mimetype;
    }

    videogame.save((err, result) => {
      if (err) {
        return res.status(400).json("Something went wrong");
      }
      res.json(result);
    });
  });
};

exports.remove = async (req, res) => {
  try {
    const id = req.params.id;
    await VideoGames.findByIdAndRemove(id);
    res.json("Video game removed");
  } catch (err) {
    return res.status(400).json("Something went wrong");
  }
};

exports.getVideoGameByID = async (req, res) => {
  try {
    const id = req.params.id;
    const videogame = await VideoGames.findById(id)
      .select("-image")
      .populate("category");
    res.json(videogame);
  } catch (err) {
    return res.status(400).json("Something went wrong");
  }
};

exports.getImage = async (req, res) => {
  try {
    const id = req.params.id;
    const game = await VideoGames.findById(id);

    if (game.image.data) {
      res.set("Content-Type", game.image.contentType);
      return res.send(game.image.data);
    }
    res.json(game.image);
  } catch (err) {
    return res.status(400).json("Something went wrong");
  }
};
