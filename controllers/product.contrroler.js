import Product from "../models/Product.js";

// get all product
export const getProducts = async (req, res) => {
  const product = await Product.find();
  res.json(product);
};

export const createProduct = async (req, res) => {
  try {
    const {
      title,
      slug,
      shortDescription,
      longDescription,
      price,
      discount,
      stock,
      categoryId,
      brandId,
      isFeatured,
    } = req.body;
    const product = new Product({
      title,
      slug,
      shortDescription,
      longDescription,
      price,
      discount,
      stock,
      categoryId,
      brandId,
      isFeatured,
    });
    await product.save();

    res.status(201).json({
      message: "Product created successfully",
      status: "201",
      product,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating product", error: error.message });
  }
};

export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    await product.deleteOne(); // deleteOne to remove from database
    res.json({ message: "Product removed successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      title,
      slug,
      shortDescription,
      longDescription,
      price,
      discount,
      stock,
      categoryId,
      brandId,
      isFeatured,
    } = req.body;

    // Find and update brand
    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      {
        title,
        slug,
        shortDescription,
        longDescription,
        price,
        discount,
        stock,
        categoryId,
        brandId,
        isFeatured,
      },
      { new: true, runValidators: true } // return updated doc & apply Mongoose validators
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({
      message: "Product updated successfully",
      brand: updatedProduct,
    });
  } catch (error) {
    res.status(500).json({ message: "Error updating product", error });
  }
};
