import mongoose from "mongoose";

const brandSchema = mongoose.Schema({
  name: {
    type: String,
    unique: true,
    trim: true,
    required: [true, "Please add a brand name"],
  },
  slug: {
    type: String,
    unique: true,
    trim: true,
    required: [false],
  },
});

export default mongoose.model("Brand", brandSchema);
