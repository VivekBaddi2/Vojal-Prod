import asyncHandler from "express-async-handler";
import Catalogue from "../schemas/catalogueSchema.js";

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
    file: `/uploads/${req.file.filename}`,
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
    catalogue.file = `/uploads/${req.file.filename}`;
  }

  const updated = await catalogue.save();
  res.json(updated);
});