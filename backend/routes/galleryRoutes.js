import express from "express";
import {
  getGallery,
  getGalleryById,
  createGallery,
  updateGallery,
  deleteGallery,
} from "../controllers/galleryController.js";
import upload from "../middlewares/upload.js";

const router = express.Router();

/* GET ALL / CREATE */
router
  .route("/")
  .get(getGallery)
  .post(upload.single("image"), createGallery);

/* GET ONE / UPDATE / DELETE */
router
  .route("/:id")
  .get(getGalleryById)
  .put(upload.single("image"), updateGallery)
  .delete(deleteGallery);

export default router;
