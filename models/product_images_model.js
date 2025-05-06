// Handles product images queries

import pool from "../config/db.js";

// Create a new product image
export async function createProductImage( { product_id, image_url, alt_text } ){
    const sql = `INSERT INTO product_images (product_id, image_url, alt_text )
    VALUES(?, ?, ?)
    `;
    const [ result ] = await pool.execute(sql, [ product_id, image_url, alt_text ]);
    return result.insertId;
}

// Retrieve all product images for a product
export async function getImagesByProductId(product_id){
    const sql = `SELECT * FROM product_images 
                WHERE product_id=?
                `;
    const [ rows ] = await pool.query(sql, [product_id]);
    return rows;
}

// Delete an image by image ID
export async function deleteImageByID(image_id){
    const sql = `DELETE FROM product_images 
                WHERE image_id=?
    `;
    const [ rows ] = await pool.execute(sql, [ image_id ]);
    return rows.affectedRows;
}