// Middleware to handle validation result

import { validationResult } from "express-validator";

export const handleValidationResultErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};
