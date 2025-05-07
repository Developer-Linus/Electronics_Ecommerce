import {
  createProductImageController,
  getImagesByProductIdController,
  deleteImageByIDController,
} from "../controllers/product_images_controller.js";
import upload from "../middlewares/upload_middleware.js"; // the multer config

import { verifyToken, isAdmin } from "../middlewares/auth_middlewares.js";

import express from "express";

const router = express.Router();

// Anyone can view product images
router.get("/products/:id/images", getImagesByProductIdController);

// Admins can upload/delete images
router.post(
  "/products/images/upload",
  verifyToken,
  isAdmin,
  upload.single("image"),
  createProductImageController
);
router.delete(
  "/products/images/:id",
  verifyToken,
  isAdmin,
  deleteImageByIDController
);

export default router;
