const VideoGames = require("../models/videogames.model");
const formidable = require("formidable");
const fs = require("fs");

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
    const id = req.videogame._id;
    const deletedGame = await VideoGames.findByIdAndRemove(id);
    res.json("Video game removed");
  } catch (err) {
    return res.status(400).json("Something went wrong");
  }
};

exports.getOneVideoGame = async (req, res) => {
  try {
    req.videogame.image = undefined;
    res.json(req.videogame);
  } catch (err) {
    return res.status(400).json("Something went wrong");
  }
};

exports.getImage = async (req, res) => {
  try {
    const videogame = req.videogame;

    if (videogame.image.data) {
      res.set("content-type", videogame.image.contentType);
      return res.send(videogame.image.data);
    }
    return res.json(videogame.image)

  } catch (err) {
    return res.status(400).json("Something went wrong");
  }
};

