// Define API routes for registration and login

import { register, login } from "../controllers/auth_controller.js";
import { registerValidation } from "../validations/auth_validation.js";
import { handleValidationResultErrors } from "../middlewares/validate_middleware.js";
import express from "express";

const router = express.Router();

// Route to register a new user
router.post(
  "/register",
  registerValidation,
  handleValidationResultErrors,
  register
);

// Route to login a user
router.post("/login", login);

export default router;
