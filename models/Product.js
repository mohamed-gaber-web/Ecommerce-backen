import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    title: { type: String },
    slug: { type: String },
    shortDescription: { type: String },
    longDescription: { type: String },
    price: { type: Number },
    discount: { type: Number, default: 0 },
    stock: { type: Number },
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },
    brandId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Brand",
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);

export default Product;
