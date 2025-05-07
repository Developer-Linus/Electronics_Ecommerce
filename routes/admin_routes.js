import express from "express";
import { createAdminController } from "../controllers/admin_controller.js";

const router = express.Router();

router.post("/admin/create", createAdminController);

export default router;
