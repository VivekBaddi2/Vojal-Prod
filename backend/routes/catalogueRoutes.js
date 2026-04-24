import express from "express";
import {
  getCatalogues,
  createCatalogue,
  deleteCatalogue,
  updateCatalogue,
} from "../controllers/catalogueController.js";
import upload from "../middlewares/upload.js";
import protect from "../middlewares/authMiddleware.js";
import path from "path";

const router = express.Router();

// ✅ Public
router.get("/", getCatalogues);
// ✅ Force download
router.get("/download/:filename", (req, res) => {
  const filename = req.params.filename;
  const filePath = path.join(path.resolve(), "uploads", filename);
  res.setHeader("Content-Disposition", `attachment; filename="${filename}"`);
  res.setHeader("Content-Type", "application/pdf");
  res.sendFile(filePath);
});

// ✅ Protected
router.post("/", protect, upload.single("file"), createCatalogue);
router.put("/:id", protect, upload.single("file"), updateCatalogue);
router.delete("/:id", protect, deleteCatalogue);

export default router;