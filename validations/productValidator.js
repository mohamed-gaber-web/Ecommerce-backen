import { body } from "express-validator";

import Product from "../models/Product.js";

export const createProductValidator = [
  body("title")
    .notEmpty()
    .withMessage("Name is required")
    .isLength({ min: 3, max: 100 })
    .withMessage("Title must be between 3 and 100 characters"),

  body("slug")
    .notEmpty()
    .withMessage("Slug is required")
    .isSlug()
    .withMessage("Slug must be valid")
    .custom(async (value) => {
      const existing = await Product.findOne({ slug: value });
      if (existing) {
        throw new Error("Slug already exists, must be unique");
      }
      return true;
    }),

  body("shortDescription")
    .notEmpty()
    .withMessage("Short description is required"),
  body("longDescription")
    .notEmpty()
    .withMessage("Long description is required"),

  body("price")
    .notEmpty()
    .withMessage("Price is required")
    .isFloat({ gt: 0 })
    .withMessage("Price must be greater than 0"),

  body("discount")
    .optional()
    .isFloat({ min: 0, max: 100 })
    .withMessage("Discount must be between 0 and 100"),

  body("stock")
    .notEmpty()
    .withMessage("Stock is required")
    .isInt({ min: 0 })
    .withMessage("Stock must be a non-negative integer"),

  //   body("images")
  //     .optional()
  //     .isArray()
  //     .withMessage("Images must be an array of URLs"),

  //   body("images.*")
  //     .optional()
  //     .isURL()
  //     .withMessage("Each image must be a valid URL"),

  body("categoryId")
    .notEmpty()
    .withMessage("CategoryId is required")
    .isMongoId()
    .withMessage("CategoryId must be a valid MongoDB ObjectId"),

  body("brandId")
    .notEmpty()
    .withMessage("BrandId is required")
    .isMongoId()
    .withMessage("BrandId must be a valid MongoDB ObjectId"),

  body("isFeatured")
    .optional()
    .isBoolean()
    .withMessage("isFeatured must be true or false"),
];
