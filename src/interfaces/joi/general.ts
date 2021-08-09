import Joi from "joi";

export const email = Joi.string().email().lowercase().trim();

export const name = Joi.string().trim().replace(/\s|-/g, "_");
