import {
  addOrderItem,
  getAllOrderItems,
  updateOrderItem,
  getOrderItemsByOrderId,
  deleteOrderItem,
} from "../models/order_items_model.js";

// Add order item
export const addOrderItemController = async (req, res) => {
  try {
    const { order_id, product_id, quantity, unit_price } = req.body;

    const result = await addOrderItem({
      order_id,
      product_id,
      quantity,
      unit_price,
    });
    res.status(201).json({ message: "Item added to order: ", result });
  } catch (err) {
    console.error("Error adding item to order: ", err);
    res.status(500).json({ message: "Server error adding item to the order." });
  }
};

// Get all items for a specific order
export const getOrderItemsController = async (req, res) => {
  try {
    const { order_id } = req.params;

    const [rows] = await getOrderItemsByOrderId(order_id);
    if (!rows) {
      return res.status(404).json({ message: "Order items not found." });
    }
    res.status(200).json({ message: "Order items fetched succesfully", rows });
  } catch (err) {
    console.error("Error fetching order items: ", err);
    res.status(500).json({ message: "Server error fetching order items." });
  }
};

// Update order item
export const updateOrderItemController = async (req, res) => {
  try {
    const { order_item_id } = req.params;
    const { quantity } = req.body;

    const { result, subtotal } = await updateOrderItem(quantity, order_item_id);
    if (!result) {
      return res
        .status(404)
        .json({ message: "Order item not found or updated." });
    }
    res
      .status(200)
      .json({ message: "Order item updated successfully.", subtotal });
  } catch (err) {
    console.error("Error updating order item: ", err);
    res.status(500).json("Server error updating order item.");
  }
};

// Delete order item
export const deleteOrderItemController = async (req, res) => {
  try {
    const { order_item_id } = req.params;

    const [result] = await deleteOrderItem(order_item_id);
    if (!result) {
      return res.status(404).json({ message: "Order not found." });
    }
    res.status(200).json({ message: "Order item deleted successfully." });
  } catch (err) {}
};

// Admin - Get all order items
export const getAllOrderItemsController = async (req, res) => {
  try {
    const [rows] = await getAllOrderItems();
    if (!rows) {
      return res.status(404).json({ message: "No orders items currently." });
    }
    res
      .status(200)
      .json({ message: "Orders items retrieved successfully.", rows });
  } catch (err) {
    console.error("Error fetching orders items: ", err);
    res.status(500).json({ message: "Server error fetching orders items." });
  }
};
