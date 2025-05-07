// Responsible for handling categories queries

import pool from "../config/db.js";

// Create category
export async function createCategory({ category_name, description }) {
  const sql = `INSERT INTO (category_name, description)
                VALUES(?, ?)`;
  const [result] = await pool.execute(sql, [category_name, description]);
  return result.insertId;
}

// Get all categories
export async function getAllCategories() {
  const sql = `SELECT * FROM categories`;
  const [rows] = await pool.query(sql);
  return rows;
}

// Get category by ID
export async function getProductById(id) {
  const sql = `SELECT * FROM categories WHERE category_id=?`;
  const [rows] = await pool.query(sql, [id]);
  return rows[0];
}

// Update a category
export async function updateCategory(id, { category_name, description }) {
  const sql = `UPDATE categories
                SET category_name=?,
                description=? 
                WHERE category_id=?`;
  const [result] = await pool.execute(sql, [category_name, description, id]);
  return result.affectedRows;
}

// Delete category
export async function deleteCategory(id) {
  const sql = `DELETE FROM categories WHERE category_id=?`;
  const [result] = await pool.execute(sql, [id]);
  return result.affectedRows;
}
