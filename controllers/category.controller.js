import Category from "../models/Category.js";

// @desc    Get all categories
// @route   GET /api/categories
export const getCategories = async (req, res) => {
  // find to get the data
  const categories = await Category.find();
  res.json(categories);
};

// @desc    Create new category
// @route   POST /api/categories
// const createCategory = async (req, res) => {
//   const { name } = req.body;
//   let slug = req.body.slug;

//   if (!name) {
//     return res.status(400).json({ message: "Category name is required" });
//   } else if (slug.includes(" ")) {
//     slug = slug.replace(/\s/g, "_");
//     req.body.slug = slug; // Update req.body.slug as well
//   }

//   // findOne to get last created category one
//   const categoryExists = await Category.findOne({ slug });
//   if (categoryExists) {
//     return res
//       .status(400)
//       .json({ message: "Category with this slug already exists" });
//   }

//   // If slug not provided, generate from name
//   const finalSlug = slug || name.toLowerCase().replace(/\s+/g, "-");

//   const category = await Category.create({ name, slug: finalSlug });
//   res.status(201).json(category);
// };

export const createCategory = async (req, res) => {
  try {
    const { name, slug } = req.body;
    const category = new Category({ name, slug });
    await category.save();

    res.status(201).json({
      message: "Category created successfully",
      status: "201",
      category,
    });
  } catch (error) {
    res.status(500).json({ message: "Error creating category", error });
  }
};

// @desc    Get category by ID
// @route   GET /api/categories/:id
export const getCategoryById = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }
    res.json(category);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
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

// export const updateCategory = async (req, res) => {
//   try {
//     const { name, slug } = req.body;

//     const category = await Category.findById(req.params.id);

//     if (!category) {
//       return res.status(404).json({ message: "Category not found" });
//     }

//     if (name) category.name = name;
//     if (slug) {
//       category.slug = slug.toLowerCase().replace(/\s+/g, "-");
//     } else if (name) {
//       // regenerate slug from updated name if slug not explicitly provided
//       category.slug = name.toLowerCase().replace(/\s+/g, "-");
//     }

//     const updatedCategory = await category.save();
//     res.json(updatedCategory);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };
// controllers/category.controller.js

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
      category: updatedCategory,
    });
  } catch (error) {
    res.status(500).json({ message: "Error updating category", error });
  }
};
