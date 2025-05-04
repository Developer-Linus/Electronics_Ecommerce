// Define API routes for registration and login

import { register, login } from "../controllers/auth_controller.js";
import express from "express";

const router = express.Router();


// Route to register a new user
router.post("/register", register);

// Route to login a user
router.post("/login", login)

export default router;
