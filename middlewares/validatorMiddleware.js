import { validationResult } from "express-validator";

export const brandValidate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    // Extract only error messages
    const errorMessages = errors.array().map((err) => err.msg);
    return res.status(400).json({ errors: errorMessages });
  }
  next();
};
