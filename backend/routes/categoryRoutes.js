import express from "express";
import { getCategories, createCategory } from "../controllers/categoryController.js";
import protect from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/", getCategories);
router.post("/", protect, createCategory);

export default router;