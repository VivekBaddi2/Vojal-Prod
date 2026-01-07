import express from "express";
import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/productController.js";

import upload from "../middlewares/upload.js";

const productRouter = express.Router();

// Routes
productRouter.route("/").get(getProducts);
productRouter.route("/:id").get(getProductById);

// Create product with image upload
productRouter.route("/").post(upload.single("image"), createProduct);

// Update product with optional image upload
productRouter.route("/:id").put(upload.single("image"), updateProduct);

// Delete product
productRouter.route("/:id").delete(deleteProduct);

export default productRouter;
