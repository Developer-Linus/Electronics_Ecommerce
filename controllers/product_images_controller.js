// Handles product images business logic - HTTP logic.
import {
    createProductImage,
    getImagesByProductId,
    deleteImageByID
} from "../models/product_images_model.js";

// Controller to add image to a product
export const createProductImageController = async(req, res) => {
try {
    const { product_id, image_url, alt_text } = req.body;
    if(!product_id || !image_url || !alt_text){
        return res.status(400).json({ message: "All fields are required." });
    }

    const imageId = await createProductImage({ product_id, image_url, alt_text });
    res.status(201).json({ message: "Product image created successfully.", image_id: imageId});
} catch (err) {
    console.error("Error creating product images: ", err);
    res.status(500).json({ message: "Server error creating product images." });
}
}

// Controller to get all images of a product
export const getImagesByProductIdController = async(req, res) => {
    try {
        const product_id = req.params.id;
        const images = await getImagesByProductId(product_id);
        res.status(200).json(images);
    } catch (err) {
        console.error("Error getting product images: ", err);
        res.status(500).json({ message: "Server error getting product images."});
    }
}

// Controller to delete an image by ID
export const deleteImageByIDController = async(req, res) => {
    try {
        const image_id = req.params.id;
        const affectedRows = await deleteImageByID(image_id);
        if(affectedRows === 0){
            return res.status(404).json({ message: "Image not found." });
        }
        res.status(200).json({ message: "Image deleted successfully."});
    } catch (err) {
        console.error("Error deleting image: ", err);
        res.status(500).json({ message: "Server error deleting image." });
    }
}