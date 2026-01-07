import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true }, // this will store the image path
      category: { type: String, required: true }, // NEW
  },
  { timestamps: true }
);

export default mongoose.model("Product", productSchema);
