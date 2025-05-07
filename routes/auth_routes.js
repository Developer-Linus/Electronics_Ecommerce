// Define API routes for registration and login

import {
  register,
  login,
  activateAccountController,
} from "../controllers/auth_controller.js";
import {
  registerValidation,
  loginValidation,
} from "../validations/auth_validation.js";
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
router.post("/login", loginValidation, handleValidationResultErrors, login);

// Route to activate account
router.get("/activate/:token", activateAccountController);

export default router;
