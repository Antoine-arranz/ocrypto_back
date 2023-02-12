import Joi from "joi";

export const type = Joi.string().valid("buy", "sell").required();
export const date = Joi.date().required();
export const quantity = Joi.number().required();
export const fees = Joi.number();
