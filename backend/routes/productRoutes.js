import express from "express";
import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/productController.js";
import upload from "../middlewares/upload.js";
import protect from "../middlewares/authMiddleware.js";

const productRouter = express.Router();

// ✅ Public routes
productRouter.route("/").get(getProducts);
productRouter.route("/:id").get(getProductById);

// ✅ Protected routes (JWT required)
productRouter.route("/").post(protect, upload.single("image"), createProduct);
productRouter.route("/:id").put(protect, upload.single("image"), updateProduct);
productRouter.route("/:id").delete(protect, deleteProduct);

export default productRouter;