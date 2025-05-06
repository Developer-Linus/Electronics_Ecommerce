// Handling categories business logic

import {
    createCategory,
    getAllCategories,
    getProductById,
    updateCategory,
    deleteCategory
}
from "../models/categories_model.js";

// Create new category
export const createCategoryController = async(req, res)=>{
    try {
        const { category_name, description } = req.body;

        if(!category_name || !description){
            return res.status(400).json({ message:"All fields are required." })
        }
        
        const id = await createCategory({ category_name, description })
        res.status(201).json({ message: "Category created successfully.", category_id: id });
        
    } catch (err) {
        console.error('Error creating category: ', err);
        res.status(500).json({ message: "Server error creating a category."})
    }
    
}

// Get all categories
export const getAllCategoriesController = async(req, res) => {
    try {
        const categories = await getAllCategories();
        res.status(200).json(categories);
    } catch (err) {
        console.log('Error getting categories: ', err);
        res.status(500).json({ message: "Server error getting categories."});
    }
    
}

// Get category by ID
export const getProductByIdController = async(req, res) => {
    const { id } = req.params;
    const category = await getProductById(id);
    if(!category){
        return res.status(404).json({ message: "Category not found."});
    }
    res.status(200).json(category);
}

// Update category
export const updateCategoryController = async(req, res) => {
    try {
        const { id } = req.params;
        const { category_name, description } = req.body;

        const affected = await updateCategory(id, { category_name, description });
        if(!affected){
            return res.status(404).json({ message: "Category not found or changed."});
        }
        res.status(200).json({ message: "Category successfully updated."});
    } catch (err) {
        console.error('Error updating category: ', err);
        res.status(500).json({ message: "Server error updating a category."});
    }
}

// Delete category
export const deleteCategoryController = async(req, res) => {
    try {
        const { id } = req.params;
        const affected = await deleteCategory(id);
        if(!affected){
            return res.status(404).json({ message: "Category not found."});
        }
        res.status(200).json({ message: "Category deleted successfully."});
    } catch (err) {
        console.error('Error deleting category: ', err);
        res.status(500).json({ message: "Server error deleting category."});
    }
}