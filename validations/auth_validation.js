import { body } from "express-validator";

// User registration validation
export const registerValidation = [
  body("first_name").notEmpty().withMessage("First name is required."),
  body("last_name").notEmpty().withMessage("Last name is required."),
  body("email").isEmail().withMessage("Valid email is required."),
  body("password")
    .isLength({ min: 8 })
    .withMessage("Passwords must be at least 8 characters long.")
    .matches(/[A-Z]/)
    .withMessage("Password must contain an uppercase letter.")
    .matches(/[a-z]/)
    .withMessage("Passwords must contain a lower case letter.")
    .matches(/[0-9]/)
    .withMessage("Password must contain a number."),
];

// Login validation
export const loginValidation = [
  body("email").isEmail().withMessage("Please enter a valid email."),
  body("password").notEmpty().withMessage("Password is required."),
];
