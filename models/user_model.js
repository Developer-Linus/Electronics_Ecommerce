// Handles database queries related to users

import pool from "../config/db.js";
export const createUser = async ({
  first_name,
  last_name,
  email,
  password,
  user_role = "Customer",
  activation_token,
}) => {
  const sql = `INSERT INTO users (first_name, last_name, email, password_hash, user_role, activation_token) VALUES (?, ?, ?, ?, ?, ?)`;

  // Result is an array containing the metadata of query execution
  const [result] = await pool.execute(sql, [
    first_name,
    last_name,
    email,
    password,
    user_role,
    activation_token,
  ]);
  return result.insertId; // Return new user's ID
};

export const findUserByEmail = async (email) => {
  const sql = `SELECT * FROM users WHERE email=? LIMIT 1`;

  const [rows] = await pool.query(sql, [email]);
  return rows[0];
};

export const activateUserByToken = async (token) => {
  const sql = `SELECT * FROM users WHERE activation_token=?`;
  const [user] = await pool.query(sql, [token]);

  if (!user || user.length === 0) return false;

  const sql_query = `UPDATE users SET is_active = true, activation_token = NULL WHERE activation_token=?`;

  await pool.execute(sql_query, [token]);

  return true;
};
