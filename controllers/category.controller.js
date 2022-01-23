const Category = require("../models/category.model");
const mongoose  = require("mongoose")

const objectID = mongoose.Types.ObjectId;

exports.create = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ message: "a name is required" });
    }

    const category = new Category({ name });
    const categoryCreated = await category.save();
    res.json(categoryCreated);
  } catch (err) {
    return res.status(400).json({
      error: "Something went wrong",
    });
  }
};

exports.list = async (req, res) => {
  try {
    const allCategoryes = await Category.find();
    res.json(allCategoryes);
  } catch (err) {
    return res.status(400).json({
      error: "Something went wrong",
    });
  }
};

exports.remove = async (req, res) => {
  try {
    const id = req.params.id;

    if(!objectID.isValid(id)){
      return res.status(400).json({ message: "Invalid ID" });
    }

    const catRemo = await Category.findByIdAndRemove(id);

    if(!catRemo){
      return res.status(400).json({ message: "Category not found" });
    }

    res.json("Category removed");
  } catch (err) {
    return res.status(400).json({
      error: "Something went wrong",
    });
  }
};

exports.getByID = async (req, res) => {
  try {
    const id = req.params.id;

    if(!objectID.isValid(id)){
      return res.status(400).json({ message: "Invalid ID" });
    }

    const categorySearched = await Category.findById(id);
    res.json(categorySearched);
  } catch (err) {
    return res.status(400).json({
      error: "Something went wrong",
    });
  }
};
