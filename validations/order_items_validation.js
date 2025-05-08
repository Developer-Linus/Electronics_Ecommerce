import { body } from "express-validator";

// Validate order item creation
export const orderItemValidation = [
  body("order_id").isInt().withMessage("Order ID must be an integer."),
  body("product_id").isInt().withMessage("Product ID must be an integer."),
  body("quantity")
    .isInt({ min: 1 })
    .withMessage("Quantity must be at least 1."),
  body("unit_price")
    .isFloat({ min: 0.01 })
    .withMessage("Unit price must be greater than 0."),
];
