import {
  addOrderItemController,
  getAllOrderItemsController,
  getOrderItemsController,
  updateOrderItemController,
  deleteOrderItemController,
} from "../controllers/order_items_controller.js";

import express from "express";

const router = express.Router();

// Route for creating order item
router.post("/order_items", addOrderItemController);

// Route for getting order items
router.get("/order_items/:order_id/items", getOrderItemsController);

// Route for updating an order item
router.put("/order_items/:order_item_id", updateOrderItemController);

// Route for removing an item from an order
router.delete("/order_items/:order_item_id", deleteOrderItemController);

// Route for getting all order items - Admin use
router.get("/order_items/admin", getAllOrderItemsController);

export default router;
