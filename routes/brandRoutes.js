import express from "express";
import { validate } from "../middlewares/validate.js";

import {
  createBrand,
  deleteBrand,
  getBrandById,
  getBrands,
  updateBrand,
} from "../controllers/brand.controller.js";

import { createBrandValidator } from "../validations/brandValidator.js";
import { brandValidate } from "../middlewares/validatorMiddleware.js";

const router = express.Router();

// create routers apis
router.get("/", getBrands);
router.post("/", createBrandValidator, brandValidate, createBrand); // validate(createBrandSchema) => by joi validation
router.delete("/:id", deleteBrand);
router.get("/:id", getBrandById);
router.put("/:id", createBrandValidator, brandValidate, updateBrand);

export default router;
