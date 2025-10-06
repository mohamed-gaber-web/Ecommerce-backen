import Category from "../models/Category.js";

export const getCategories = async (req, res) => {
  const categories = await Category.find();
  res.json(categories);
};

export const createCategory = async (req, res) => {
  try {
    const { name, slug } = req.body; // name and slug from => body
    const category = new Category({ name, slug });
    await category.save();

    res.status(201).json({
      // 201 => Created
      message: "Category created successfully",
      status: "201",
    });
  } catch (error) {
    res.status(500).json({ message: "Error creating category", error });
  }
};

export const getCategoryById = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id); // id from => params
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }
    res.json(category);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

export const deleteCategory = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }
    await category.deleteOne();
    res.json({ message: "Category removed successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, slug } = req.body;

    // Find and update category
    const updatedCategory = await Category.findByIdAndUpdate(
      id,
      { name, slug },
      { new: true, runValidators: true } // return updated doc & apply Mongoose validators
    );

    if (!updatedCategory) {
      return res.status(404).json({ message: "Category not found" });
    }

    res.status(200).json({
      message: "Category updated successfully",
    });
  } catch (error) {
    res.status(500).json({ message: "Error updating category", error });
  }
};
