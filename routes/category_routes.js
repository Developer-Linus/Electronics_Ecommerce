import {
  createCategoryController,
  getAllCategoriesController,
  getProductByIdController,
  updateCategoryController,
  deleteCategoryController,
} from "../controllers/category_controller.js";
import { verifyToken, isAdmin } from "../middlewares/auth_middlewares.js";
import express from "express";

const router = express.Router();

// Public routes
router.get("/categories", getAllCategoriesController);
router.get("/categories/:id", getProductByIdController);

// Admin-only routes
router.post("/categories", verifyToken, isAdmin, createCategoryController);
router.put("/categories/:id", verifyToken, isAdmin, updateCategoryController);
router.delete(
  "/categories/:id",
  verifyToken,
  isAdmin,
  deleteCategoryController
);

export default router;
