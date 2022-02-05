const Category = require("../models/category.model");


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

    const categToRemove = req.category
    const catRemo = await Category.findByIdAndRemove(categToRemove._id);
    res.json("Category removed");

  } catch (err) {
    return res.status(400).json({
      error: "Something went wrong",
    });
  }
};

exports.getByID = async (req, res) => {
  try {

    const categorySearched = req.category
    res.json(categorySearched);

  } catch (err) {
    return res.status(400).json({
      error: "Something went wrong",
    });
  }
};



