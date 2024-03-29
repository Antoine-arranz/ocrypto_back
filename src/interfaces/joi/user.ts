import Joi from "joi";

import { name, email } from "./general";

export const passwordSchema = Joi.string().min(4).trim().required();

export const signupSchema = Joi.object().keys({
  email: email.required(),
  password: passwordSchema,
  confirmPassword: passwordSchema,
  lastName: name,
  firstName: name,
  country: Joi.string().length(2).trim().uppercase().required(),
});

export const loginSchema = Joi.object().keys({
  email: email.required(),
  password: passwordSchema,
});

export const updateUserSchema = Joi.object().keys({
  email,
  lastName: name,
  firstName: name,
});
