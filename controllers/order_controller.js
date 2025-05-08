// Order business logic
import {
  createOrder,
  getAllOrders,
  getUserOrders,
  updateOrderStatus,
  deleteOrder,
} from "../models/order_model.js";

// Create a new order
export const createOrderController = async (req, res) => {
  try {
    const { user_id, total } = req.body;

    const orderId = await createOrder({ user_id, total });
    res
      .status(201)
      .json({ message: "Order created successfully.", order_id: orderId });
  } catch (err) {
    console.error("Error creating order: ", err);
    res.status(500).json({ message: "Server error creating order" });
  }
};

// Get all orders - Admin
export const getAllOrdersController = async (req, res) => {
  try {
    const orders = await getAllOrders();
    res.status(200).json(orders);
  } catch (err) {
    console.error("Error getting orders: ", err);
    res.status(500).json({ message: "Server error retrieving orders." });
  }
};

// User: Get their own orders
export const getUserOrdersController = async (req, res) => {
  try {
    const { user_id } = req.params;
    const orders = await getUserOrders(user_id);
    res.status(200).json(orders);
  } catch (err) {
    console.error("Error fetching orders: ", err);
    res.status(500).json({ message: "Server error fetching orders." });
  }
};

// Update order status
export const updateOrderStatusController = async (req, res) => {
  try {
    const { order_id } = req.params;
    const { status } = req.body;

    const updated = await updateOrderStatus({ order_id, status });

    if (!updated) {
      return res.status(404).json({ message: "Order not found or updated." });
    }
    res.status(200).json({ message: "Order status updated." });
  } catch (err) {
    console.error("Error updating order status: ", err);
    res.status(500).json({ message: "Server error updating order status." });
  }
};

// Delete an order
export const deleteOrderController = async (req, res) => {
  try {
    const { order_id } = req.params;
    const deleted = await deleteOrder(order_id);
    if (!deleted) {
      return res.status(404).json({ message: "Order not found." });
    }
    res.status(200).json({ message: "Order successfully deleted." });
  } catch (err) {}
};
