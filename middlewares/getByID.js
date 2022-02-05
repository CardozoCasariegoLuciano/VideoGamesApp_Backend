const mongoose = require("mongoose");
const objectID = mongoose.Types.ObjectId;
const Category = require("../models/category.model");
const VideoGames = require("../models/videogames.model");

exports.categoryByID = async (req, res, next, id) => {
  try {
    if (!objectID.isValid(id)) {
      return res.status(400).json({ message: "Invalid ID" });
    }

    const categorySearched = await Category.findById(id);

    if (!categorySearched) {
      return res.status(400).json({ message: "Category not found" });
    }

    req.category = categorySearched;
    next();
  } catch (err) {
    return res.status(400).json("Something went wrong");
  }
};

exports.videogameByID = async (req, res, next, id) => {
  try {
    if (!objectID.isValid(id)) {
      return res.status(400).json({ message: "Invalid ID" });
    }

    const videogamefound = await VideoGames.findById(id).populate("category");

    if (!videogamefound) {
      return res.status(400).json({ message: "Game not found" });
    }

    req.videogame = videogamefound;
    next();
  } catch (err) {
    return res.status(400).json("Something went wrong");
  }
};
