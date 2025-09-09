const Category = require("../models/Category");

// @desc    Get all categories
// @route   GET /api/categories
const getCategories = async (req, res) => {
  const categories = await Category.find();
  res.json(categories);
};

// @desc    Create new category
// @route   POST /api/categories
const createCategory = async (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ message: "Category name is required" });
  }

  const categoryExists = await Category.findOne({ name });
  if (categoryExists) {
    return res.status(400).json({ message: "Category already exists" });
  }

  const category = await Category.create({ name });

  res.status(201).json(category);
};

module.exports = { getCategories, createCategory };
