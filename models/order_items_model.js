// Handles queries pertaining order items table
import pool from "../config/db.js";

// Add item(s) to a database
export const addOrderItem = async ({
  order_id,
  product_id,
  quantity,
  unit_price,
}) => {
  const subtotal = +(quantity * unit_price).toFixed(2); // Making subtotal to 2 decimal places and maintaining it as a number

  const sql = `INSERT INTO order_items (order_id, product_id, quantity, unit_price, subtotal)
  VALUES(?, ?, ?, ?, ?)`;
  const [result] = await pool.execute(sql, [
    order_id,
    product_id,
    quantity,
    unit_price,
    subtotal,
  ]);
  return result;
};

// Get all items for a particular order
export const getOrderItemsByOrderId = async (order_id) => {
  const sql = `SELECT * FROM order_items WHERE order_id=?`;

  const [rows] = await pool.query(sql, [order_id]);
  return rows;
};

// Update an order item
export const updateOrderItem = async (quantity, order_item_id) => {
  // Fetch existing unit_price
  const [rows] = await pool.query(
    `SELECT * FROM order_items WHERE order_item_id=?`,
    [order_item_id]
  );
  if (rows.length === 0) {
    throw new error("Order item not found.");
  }

  const unit_price = rows[0].unit_price;

  const subtotal = +(quantity * unit_price).toFixed(2);

  const sql = `UPDATE order_items SET quantity = ?, subtotal=? WHERE order_item_id=?`;

  const [result] = await pool.execute(sql, [quantity, subtotal, order_item_id]);
  return { result, subtotal };
};

// Delete an item from order
export const deleteOrderItem = async (order_item_id) => {
  const sql = `DELETE FROM order_items WHERE order_item_id=?`;

  const [result] = await pool.execute(sql, [order_item_id]);
  return result;
};

// Get all order items (admin use)
export const getAllOrderItems = async () => {
  const sql = `SELECT * FROM order_items`;

  const [rows] = await pool.query(sql);
  return rows;
};
