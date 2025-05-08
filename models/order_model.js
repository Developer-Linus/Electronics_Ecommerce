import pool from "../config/db.js";

// Create a new order
export const createOrder = async ({ user_id, total }) => {
  const sql = `INSERT INTO orders (user_id, total) VALUES(?, ?)`;
  const [result] = await pool.execute(sql, [user_id, total]);
  return result.insertId;
};

// Fetch all orders (admin use)
export const getAllOrders = async () => {
  const sql = `SELECT * FROM orders`;
  const [rows] = await pool.query(sql);
  return rows;
};

// Fetch orders for a specific user
export const getUserOrders = async (user_id) => {
  const sql = `SELECT * FROM orders WHERE user_id=?`;
  const [rows] = await pool.query(sql, [user_id]);
  return rows;
};

// Update order status
export const updateOrderStatus = async ({ order_id, status }) => {
  const sql = `UPDATE orders SET status=? WHERE order_id=?`;

  const [updated] = await pool.execute(sql, [status, order_id]);

  return updated.affectedRows;
};

// Delete an order
export const deleteOrder = async (order_id) => {
  const sql = `DELETE FROM orders WHERE order_id=?`;
  const [result] = await pool.execute(sql, [order_id]);
  return result.affectedRows;
};
