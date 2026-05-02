import asyncHandler from "express-async-handler";
import Gallery from "../schemas/gallerySchema.js";
import { v2 as cloudinary } from "cloudinary";

/* =========================
   GET ALL GALLERY IMAGES
========================= */
export const getGallery = asyncHandler(async (req, res) => {
  const gallery = await Gallery.find().sort({ createdAt: -1 });
  res.json(gallery);
});

/* =========================
   GET SINGLE IMAGE
========================= */
export const getGalleryById = asyncHandler(async (req, res) => {
  const gallery = await Gallery.findById(req.params.id);

  if (!gallery) {
    res.status(404);
    throw new Error("Gallery item not found");
  }

  res.json(gallery);
});

/* =========================
   CREATE GALLERY ITEM
========================= */
export const createGallery = asyncHandler(async (req, res) => {
  const { title, description } = req.body;

  if (!title || !description || !req.file) {
    res.status(400);
    throw new Error("Title, description and image are required");
  }

  const gallery = await Gallery.create({
    title,
    description,
    image: req.file.path,
  });

  res.status(201).json(gallery);
});

/* =========================
   UPDATE GALLERY ITEM
========================= */
export const updateGallery = asyncHandler(async (req, res) => {
  const { title, description } = req.body;
  const gallery = await Gallery.findById(req.params.id);

  if (!gallery) {
    res.status(404);
    throw new Error("Gallery item not found");
  }

  gallery.title = title || gallery.title;
  gallery.description = description || gallery.description;

  if (req.file) {
    gallery.image = req.file.path;
  }

  const updatedGallery = await gallery.save();
  res.json(updatedGallery);
});

/* =========================
   DELETE GALLERY ITEM
========================= */
export const deleteGallery = asyncHandler(async (req, res) => {
  const gallery = await Gallery.findById(req.params.id);

  if (!gallery) {
    res.status(404);
    throw new Error("Gallery item not found");
  }

  if (gallery.image) {
    try {
      const publicId = gallery.image.split('/').slice(-2).join('/').split('.')[0];
      
      await cloudinary.uploader.destroy(publicId);
    } catch (error) {
      console.error("Cloudinary Delete Failed:", error);
    }
  }

  await gallery.deleteOne();
  
  res.json({ message: "Gallery item and image removed successfully" });
});