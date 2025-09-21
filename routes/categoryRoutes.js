import express from "express";
import { validate } from "../middlewares/validate.js";
import {
  createCategory,
  getCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
} from "../controllers/category.controller.js";

import {
  createCategorySchema,
  updateCategorySchema,
} from "../validations/category.validation.js";

const router = express.Router();

router.get("/", getCategories);
router.post("/", validate(createCategorySchema), createCategory);
router.delete("/:id", deleteCategory);
router.get("/:id", getCategoryById);
router.put("/:id", validate(updateCategorySchema), updateCategory);

export default router;
