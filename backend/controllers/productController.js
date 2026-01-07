import asyncHandler from "express-async-handler";
import Product from "../schemas/productSchema.js";

// Get all products
export const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({});
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
  const { title, description } = req.body;
  const image = req.file ? `/uploads/${req.file.filename}` : null;

  if (!title || !description || !image) {
    res.status(400);
    throw new Error("Title, description, and image are required");
  }

  const product = new Product({ title, description, image });
  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
});

// Update product
export const updateProduct = asyncHandler(async (req, res) => {
  const { title, description } = req.body;
  const product = await Product.findById(req.params.id);

  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }

  if (req.file) {
    product.image = `/uploads/${req.file.filename}`;
  }
  product.title = title || product.title;
  product.description = description || product.description;

  const updatedProduct = await product.save();
  res.json(updatedProduct);
});

// Delete product
export const deleteProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const product = await Product.findById(id);

  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }

  await Product.findByIdAndDelete(id);

  res.status(200).json({
    success: true,
    message: "Product removed successfully",
  });
});
