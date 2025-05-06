// Handles database queries related to users

import pool from "../config/db.js";

export async function createUser({ first_name, last_name, email, password }){
    const sql = `INSERT INTO users (first_name, last_name, email, password_hash) VALUES (?, ?, ?, ?)`;

    // Result is an array containing the metadata of query execution
    const [ result ] = await pool.execute(sql, [first_name, last_name, email, password]);
    return result.insertId; // Return new user's ID
}

export async function findUserByEmail(email){
    const sql = `SELECT * FROM users WHERE email=? LIMIT 1`;

    const [ rows ] = await pool.query(sql, [email]);
    return rows[0];
}