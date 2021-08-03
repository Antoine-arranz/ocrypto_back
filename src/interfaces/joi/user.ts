import Joi from "joi";

import { name, email } from "./general";

export const passwordSchema = Joi.string().min(4).trim().required();

export const signupSchema = Joi.object().keys({
  email: email.required(),
  password: passwordSchema,
  lastName: name,
  firstName: name,
  country: Joi.string().length(2).trim().uppercase(),
});
