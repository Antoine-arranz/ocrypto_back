import Joi from "joi";

export const email = Joi.string().email().lowercase().trim();

export const name = Joi.string().trim().replace(/\s|-/g, "_");
export const id = Joi.number();

export const idSchema = id.required();

export const text = Joi.string();

export const booleanSchema = Joi.boolean().required();

export const textSchema = Joi.string().required();
