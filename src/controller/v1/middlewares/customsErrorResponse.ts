import { ValidationError } from "sequelize";
import * as CustomErrors from "../../../interfaces/error/CustomsErrors";

export default (res, error): void => {
  let code = 500;
  let { message } = error;
  if (error instanceof ValidationError) {
    if (Array.isArray(error.errors)) {
      error.errors.forEach((err: any) => {
        if (err.validatorKey === "not_unique") {
          code = 406;
          message = `${err.value} must be unique`;
        }
      });
    }
  } else if (
    Object.keys(CustomErrors).find((e) => error.constructor.name === e)
  ) {
    code = error.httpCode;
    message = error.message;
  }

  return res.status(code).json({ err: true, message });
};
