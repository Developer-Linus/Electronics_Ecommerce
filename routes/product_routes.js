// Define API routes for products
import express from "express";
import {
  createProductController,
  getAllProductsController,
  getProductByIdController,
  updateProductController,
  deleteProductController,
} from "../controllers/product_controller.js";

import { verifyToken, isAdmin } from "../middlewares/auth_middlewares.js";

const router = express.Router();

// Public routes
router.get("/products", getAllProductsController);
router.get("/products/:id", getProductByIdController);

// Admin-only routes
router.post("/products", verifyToken, isAdmin, createProductController);
router.put("/products/:id", verifyToken, isAdmin, updateProductController);
router.delete("/products/:id", verifyToken, isAdmin, deleteProductController);

export default router;
