// Responsible for database queries related to products and product images

// Import DB connection pool
import pool from "../config/db.js";

// Create a new product
export async function createProduct({
  name,
  category_id,
  description,
  original_price,
  current_price,
  stock,
}) {
  const sql = `
        INSERT INTO products (product_name, category_id, product_description, original_price, current_price, stock)
        VALUES (?, ?, ?, ?, ?, ?)
        `;
  const [result] = await pool.execute(sql, [
    name,
    category_id,
    description,
    original_price,
    current_price,
    stock,
  ]);
  return result.insertId;
}

// Get all products
export async function getAllProducts() {
  const sql = `SELECT p.*, c.category_name 
                FROM products p 
                LEFT JOIN categories c
                ON p.category_id = c.category_id
                ORDER BY created_at DESC`;
  const [rows] = await pool.query(sql);
  return rows;
}

// Get one product by ID
export async function getProductById(id) {
  const sql = `SELECT p.*, c.category_name 
                FROM products p
                LEFT JOIN categories c
                ON p.category_id = c.category_id
                WHERE product_id = ?`;
  const [rows] = await pool.query(sql, [id]);
  return rows[0];
}

// Update product details
export async function updateProduct(
  id,
  { name, category_id, description, original_price, current_price, stock }
) {
  const sql = `
        UPDATE products 
        SET
        product_name=?,
        category_id=?,
        product_description=?,
        original_price=?,
        current_price=?,
        stock=?
        WHERE product_id=?
        `;
  const [result] = await pool.execute(sql, [
    name,
    category_id,
    description,
    original_price,
    current_price,
    stock,
    id,
  ]);
  return result.affectedRows;
}

// Delete product
export async function deleteProduct(id) {
  const sql = `
        DELETE FROM products
        WHERE product_id=?`;
  const [result] = await pool.execute(sql, [id]);
  return result.affectedRows;
}
