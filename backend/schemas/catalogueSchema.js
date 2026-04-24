import mongoose from "mongoose";

const catalogueSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    file: { type: String, required: true }, // PDF path
    category: { type: String, default: "General" },
  },
  { timestamps: true }
);

export default mongoose.model("Catalogue", catalogueSchema);