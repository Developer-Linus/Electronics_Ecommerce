// Responsible for products business logic

import {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} from "../models/product_model.js";

// Create product - admin only
export const createProductController = async (req, res) => {
  try {
    const {
      name,
      category_id,
      description,
      original_price,
      current_price,
      stock,
    } = req.body;

    // Validation
    if (
      !name ||
      !category_id ||
      !description ||
      !original_price ||
      !current_price ||
      !stock
    ) {
      return res.status(400).json({ message: "All fields are required." });
    }
    const productId = await createProduct({
      name,
      category_id,
      description,
      original_price,
      current_price,
      stock,
    });
    res
      .status(201)
      .json({ message: "Product created successfully.", productId });
  } catch (err) {
    console.error("Create product error:", err);
    res.status(500).json({ message: "Server error creating the product." });
  }
};

// Get all products
export const getAllProductsController = async (req, res) => {
  try {
    const products = await getAllProducts();
    res.status(200).json(products);
  } catch (err) {
    console.error("Fetch all products error:", err);
    res.status(500).json({ message: "Server error fetching products." });
  }
};

// Get product by ID
export const getProductByIdController = async (req, res) => {
  try {
    const product = await getProductById(req.params.id);
    if (!product) {
      res.status(404).json({ message: "Product not found." });
    }
    res.status(200).json(product);
  } catch (err) {
    console.error("Fetch product error: ", err);
    res.status(500).json({ message: "Server error fetching product." });
  }
};

// Update product (admins only)
export const updateProductController = async (req, res) => {
  try {
    const id = req.params.id;
    const {
      name,
      category_id,
      description,
      original_price,
      current_price,
      stock,
    } = req.body;

    const updated = await updateProduct(id, {
      name,
      category_id,
      description,
      original_price,
      current_price,
      stock,
    });
    if (!updated) {
      return res.status(404).json({ message: "Product not found or updated." });
    }
    res.status(200).json({ message: "Product updated successfully." });
  } catch (err) {
    console.error("Update product error: ", err);
    res.status(500).json({ message: "Server error updating product." });
  }
};

// Delete product (Admins only)
export const deleteProductController = async (req, res) => {
  try {
    const id = req.params.id;
    const deleted = await deleteProduct(id);
    if (!deleted) {
      return res.status(404).json({ message: "Product not found." });
    }
    res.status(200).json({ message: "Product successfully deleted." });
  } catch (err) {
    console.error("Delete product error: ", err);
    res.status(500).json({ message: "Server error deleting product." });
  }
};
