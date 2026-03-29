import express from "express";
import {
  getGallery,
  getGalleryById,
  createGallery,
  updateGallery,
  deleteGallery,
} from "../controllers/galleryController.js";
import upload from "../middlewares/upload.js";
import protect from "../middlewares/authMiddleware.js";

const router = express.Router();

// ✅ Public routes
router.route("/").get(getGallery);
router.route("/:id").get(getGalleryById);

// ✅ Protected routes (JWT required)
router.route("/").post(protect, upload.single("image"), createGallery);
router.route("/:id").put(protect, upload.single("image"), updateGallery);
router.route("/:id").delete(protect, deleteGallery);

export default router;