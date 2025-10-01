import express from "express";

import {
  createProduct,
  deleteProduct,
  getProductById,
  getProducts,
  updateProduct,
} from "../controllers/product.contrroler.js";
import { createProductValidator } from "../validations/productValidator.js";
import { validate } from "../middlewares/validatorMiddleware.js";

const router = express.Router();

router.get("/", getProducts);
router.post("/", createProductValidator, validate, createProduct);
router.get("/:id", getProductById);
router.delete("/:id", deleteProduct);
router.put("/:id", createProductValidator, validate, updateProduct);

export default router;
