import { body } from "express-validator";

// User registration validation
export const registerValidation = [
  body("first_name")
    .trim()
    .notEmpty()
    .withMessage("First name is required.")
    .escape(),
  body("last_name")
    .trim()
    .notEmpty()
    .withMessage("Last name is required.")
    .escape(),
  body("email")
    .isEmail()
    .withMessage("Valid email is required.")
    .normalizeEmail()
    .escape(),
  body("password")
    .trim()
    .matches(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{8,}$/)
    .withMessage(
      "Passwords must be at least 8 characters long, contain an uppercase letter, a lower case letter, and a number."
    )
    .escape(),
];

// Login validation
export const loginValidation = [
  body("email").isEmail().withMessage("Please enter a valid email."),
  body("password").notEmpty().withMessage("Password is required."),
];
