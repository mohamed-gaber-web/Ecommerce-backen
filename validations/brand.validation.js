// validations/category.validation.js
import Joi from "joi";

export const createBrandSchema = Joi.object({
  name: Joi.string().min(3).max(50).required().messages({
    "any.required": '"name" is a required field',
  }),
  slug: Joi.string().min(1).optional().messages({
    "string.min": '"slug" is not allowed to be empty',
  }),
});

export const updateBrandSchema = Joi.object({
  name: Joi.string().min(3).max(50).required().messages({
    "any.required": '"name" is a required field',
  }),
  slug: Joi.string().min(3).max(50).optional(),
});
