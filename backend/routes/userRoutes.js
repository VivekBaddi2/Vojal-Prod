import express from "express";
import {
  createAdmin,
  adminLogin,
  updateAdmin,
  deleteAdmin,
  getAdminById,
  getAllAdmins
} from "../controllers/userController.js";

const adminRouter = express.Router();

// Create a new admin
adminRouter.route("/create").post(createAdmin);

// Admin login
adminRouter.route("/login").post(adminLogin);

// Update an admin by ID
adminRouter.route("/update/:id").put(updateAdmin);

// Delete an admin by ID
adminRouter.route("/delete/:id").delete(deleteAdmin);

// Get admin by ID
adminRouter.route("/:id").get(getAdminById);

// Get all admins
adminRouter.route("/").get(getAllAdmins);

export default adminRouter;
