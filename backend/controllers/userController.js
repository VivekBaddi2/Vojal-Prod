import asyncHandler from "express-async-handler";
import Admin from "../schemas/userSchema.js";
import bcrypt from "bcryptjs";

export const createAdmin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400);
    throw new Error("Email and password are required");
  }

  // Check if admin already exists
  const existingAdmin = await Admin.findOne({ email });
  if (existingAdmin) {
    res.status(400);
    throw new Error("Admin with this email already exists");
  }

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Create admin
  const admin = new Admin({
    email,
    password: hashedPassword,
  });

  const createdAdmin = await admin.save();
  res.status(201).json({
    _id: createdAdmin._id,
    email: createdAdmin.email,
  });
});


export const adminLogin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400);
    throw new Error("Email and password are required");
  }

  const admin = await Admin.findOne({ email });
  if (!admin) {
    res.status(401);
    throw new Error("Invalid email or password");
  }

  const isMatch = await bcrypt.compare(password, admin.password);
  if (!isMatch) {
    res.status(401);
    throw new Error("Invalid email or password");
  }

  res.json({
    _id: admin._id,
    email: admin.email,
  });
});


export const updateAdmin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const admin = await Admin.findById(req.params.id);

  if (!admin) {
    res.status(404);
    throw new Error("Admin not found");
  }

  if (email) admin.email = email;
  if (password) {
    const salt = await bcrypt.genSalt(10);
    admin.password = await bcrypt.hash(password, salt);
  }

  const updatedAdmin = await admin.save();
  res.json({ _id: updatedAdmin._id, email: updatedAdmin.email });
});


export const deleteAdmin = asyncHandler(async (req, res) => {
  const admin = await Admin.findById(req.params.id);

  if (!admin) {
    res.status(404);
    throw new Error("Admin not found");
  }

  await admin.remove();
  res.json({ message: "Admin removed successfully" });
});


export const getAdminById = asyncHandler(async (req, res) => {
  const admin = await Admin.findById(req.params.id);

  if (!admin) {
    res.status(404);
    throw new Error("Admin not found");
  }

  res.json({ _id: admin._id, email: admin.email });
});


export const getAllAdmins = asyncHandler(async (req, res) => {
  const admins = await Admin.find({});
  res.json(admins.map(a => ({ _id: a._id, email: a.email })));
});
