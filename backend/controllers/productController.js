// backend/controllers/productController.js
import asyncHandler from "express-async-handler";
import Product from "../schemas/productSchema.js";

// Get all products
export const getProducts = asyncHandler(async (req, res) => {
  const category = req.query.category; // optional filter
  const products = category
    ? await Product.find({ category }).sort({ createdAt: -1 })
    : await Product.find().sort({ createdAt: -1 });
  res.json(products);
});

// Get single product
export const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }
  res.json(product);
});

// Create product
export const createProduct = asyncHandler(async (req, res) => {
  const { title, description, category } = req.body;
  const image = req.file ? `/uploads/${req.file.filename}` : null;

  if (!title || !description || !image || !category) {
    res.status(400);
    throw new Error("Title, description, image, and category are required");
  }

  const product = new Product({ title, description, image, category });
  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
});

// Update product
export const updateProduct = asyncHandler(async (req, res) => {
  const { title, description, category } = req.body;
  const product = await Product.findById(req.params.id);

  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }

  if (req.file) product.image = `/uploads/${req.file.filename}`;
  if (title) product.title = title;
  if (description) product.description = description;
  if (category) product.category = category;

  const updatedProduct = await product.save();
  res.json(updatedProduct);
});

// Delete product
export const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }

  await Product.findByIdAndDelete(req.params.id);
  res.status(200).json({ success: true, message: "Product removed successfully" });
});
