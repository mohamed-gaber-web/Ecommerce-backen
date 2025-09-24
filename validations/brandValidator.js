// use express validators to validate fields
import { body } from "express-validator";
import Brand from "../models/Brand.js";

export const createBrandValidator = [
  body("name")
    .notEmpty()
    .withMessage("Brand name is required")
    .isString()
    .withMessage("Brand name must be a string")
    .isLength({ min: 2, max: 50 })
    .withMessage("Brand name must be 2-50 characters long")
    // custom validators don't repeat the name
    .custom(async (value) => {
      const existingBrand = await Brand.findOne({ name: value });
      if (existingBrand) {
        throw new Error("Brand name already exists");
      }
      return true;
    }),

  body("slug")
    .optional()
    .isSlug()
    .withMessage("Slug must be a valid slug (letters, numbers, hyphens)"),
];
