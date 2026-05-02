import asyncHandler from "express-async-handler";
import Catalogue from "../schemas/catalogueSchema.js";
import { v2 as cloudinary } from "cloudinary";

// GET all catalogues
export const getCatalogues = asyncHandler(async (req, res) => {
  const catalogues = await Catalogue.find().sort({ createdAt: -1 });
  res.json(catalogues);
});

// CREATE catalogue
export const createCatalogue = asyncHandler(async (req, res) => {
  const { title, description, category } = req.body;

  if (!title || !req.file) {
    res.status(400);
    throw new Error("Title and PDF file are required");
  }

  const catalogue = await Catalogue.create({
    title,
    description,
    category,
    file: req.file.path,
  });

  res.status(201).json(catalogue);
});

// DELETE catalogue
export const deleteCatalogue = asyncHandler(async (req, res) => {
  const catalogue = await Catalogue.findById(req.params.id);

  if (!catalogue) {
    res.status(404);
    throw new Error("Catalogue not found");
  }

  if (catalogue.file) {
    try {
      const publicId = catalogue.file.split('/').slice(-2).join('/').split('.')[0];
      const isPdf = catalogue.file.toLowerCase().endsWith(".pdf");
      
      await cloudinary.uploader.destroy(publicId, { 
        resource_type: isPdf ? "raw" : "image" 
      });
    } catch (error) {
      console.error("Cloudinary Catalogue Delete Failed:", error);
    }
  }

  await catalogue.deleteOne();
  
  res.json({ message: "Catalogue deleted successfully" });
});

// UPDATE catalogue
export const updateCatalogue = asyncHandler(async (req, res) => {
  const { title, description, category } = req.body;
  const catalogue = await Catalogue.findById(req.params.id);

  if (!catalogue) {
    res.status(404);
    throw new Error("Catalogue not found");
  }

  catalogue.title = title || catalogue.title;
  catalogue.description = description || catalogue.description;
  catalogue.category = category || catalogue.category;

  if (req.file) {
    catalogue.file = req.file.path;
  }

  const updated = await catalogue.save();
  res.json(updated);
});