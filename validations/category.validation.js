// validations/category.validation.js
import Joi from "joi";

export const createCategorySchema = Joi.object({
  name: Joi.string().min(3).max(50).required(),
  slug: Joi.string().alphanum().min(3).max(50).required(),
});

export const updateCategorySchema = Joi.object({
  name: Joi.string().min(3).max(50),
  slug: Joi.string().alphanum().min(3).max(50),
});
