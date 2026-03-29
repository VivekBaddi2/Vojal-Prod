import express from "express";
import {
  createAdmin,
  adminLogin,
  adminLogout,
  updateAdmin,
  deleteAdmin,
  getAdminById,
  getAllAdmins,
} from "../controllers/userController.js";
import protect from "../middlewares/authMiddleware.js";

const adminRouter = express.Router();

// ── Public ──
adminRouter.post("/login", adminLogin);

// ── Verify session (used by App.jsx on load) ──
adminRouter.get("/verify", protect, (req, res) => {
  res.json({ email: req.admin.email });
});

// ── Auth required ──
adminRouter.post("/logout", protect, adminLogout);
adminRouter.post("/create", protect, createAdmin);
adminRouter.put("/update/:id", protect, updateAdmin);
adminRouter.delete("/delete/:id", protect, deleteAdmin);
adminRouter.get("/:id", protect, getAdminById);
adminRouter.get("/", protect, getAllAdmins);

export default adminRouter;