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
adminRouter.post("/logout", adminLogout); // ✅ no protect

// ── Verify session (USED BY FRONTEND ON REFRESH) ──
adminRouter.get("/verify", protect, (req, res) => {
  res.json({
    _id: req.admin.id,
    email: req.admin.email,
  });
});

// ── Protected Routes ──
adminRouter.post("/create", protect, createAdmin);
adminRouter.put("/update/:id", protect, updateAdmin);
adminRouter.delete("/delete/:id", protect, deleteAdmin);

// ⚠️ VERY IMPORTANT ORDER
adminRouter.get("/", protect, getAllAdmins);
adminRouter.get("/:id", protect, getAdminById);

export default adminRouter;