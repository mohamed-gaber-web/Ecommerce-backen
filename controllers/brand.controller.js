import Brand from "../models/Brand.js";

// get all brands
export const getBrands = async (req, res) => {
  const brands = await Brand.find(); // schemaName.find() => get all data
  res.json(brands);
};

// create new brand
export const createBrand = async (req, res) => {
  try {
    const { name } = req.body;
    let { slug } = req.body;

    if (!slug || slug === "") {
      slug = name.toLowerCase().replace(/\s/g, "_");
    }

    const brand = new Brand({ name, slug });
    await brand.save();

    res.status(201).json({
      message: "Brand created successfully",
      status: "201",
      brand,
    });
  } catch (error) {
    res.status(500).json({ message: "Error creating brand", error });
  }
};

// get brand by id
export const getBrandById = async (req, res) => {
  try {
    const brand = await Brand.findById(req.params.id);
    if (!brand) {
      return res.status(404).json({ message: "Brand not found" });
    }
    res.json(brand);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// delete brand
export const deleteBrand = async (req, res) => {
  try {
    const brand = await Brand.findById(req.params.id);
    if (!brand) {
      return res.status(404).json({ message: "Brand not found" });
    }
    await brand.deleteOne(); // deleteOne to remove from database
    res.json({ message: "Brand removed successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// updated brand
export const updateBrand = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, slug } = req.body;

    // Find and update brand
    const updatedBrand = await Brand.findByIdAndUpdate(
      id,
      { name, slug },
      { new: true, runValidators: true } // return updated doc & apply Mongoose validators
    );

    if (!updatedBrand) {
      return res.status(404).json({ message: "Brand not found" });
    }

    res.status(200).json({
      message: "Brand updated successfully",
      brand: updatedBrand,
    });
  } catch (error) {
    res.status(500).json({ message: "Error updating brand", error });
  }
};
