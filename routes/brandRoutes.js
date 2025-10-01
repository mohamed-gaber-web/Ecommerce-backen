import express from "express";

import {
  createBrand,
  deleteBrand,
  getBrandById,
  getBrands,
  updateBrand,
} from "../controllers/brand.controller.js";

import { createBrandValidator } from "../validations/brandValidator.js";
import { validate } from "../middlewares/validatorMiddleware.js";

const router = express.Router();

// create routers apis
router.get("/", getBrands);
router.post("/", createBrandValidator, validate, createBrand); // validate(createBrandSchema) => by joi validation
router.delete("/:id", deleteBrand);
router.get("/:id", getBrandById);
router.put("/:id", createBrandValidator, validate, updateBrand);

export default router;
