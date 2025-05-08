import {
  createOrderController,
  getAllOrdersController,
  getUserOrdersController,
  updateOrderStatusController,
  deleteOrderController,
} from "../controllers/order_controller.js";

import express from "express";

const router = express.Router();

// Route for creating an order
router.post("/orders", createOrderController);

// Route for getting all orders
router.get("/orders", getAllOrdersController);

// Route for fetching own orders
router.get("/orders/user/:user_id", getUserOrdersController);

// Route for updating order status
router.put("/orders/:order_id/status", updateOrderStatusController);

// Route for deleting an order
router.delete("/orders/:order_id", deleteOrderController);

export default router;
