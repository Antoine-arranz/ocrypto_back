import jwt from "jsonwebtoken";

import customErrorResponse from "./customsErrorResponse";
import config from "../../../config";
import logger from "../../../config/logger";
import { AccountAlreadyValidatedError } from "../../../interfaces/error/CustomsErrors";
import { findOneUserById } from "../../../storage/typeORM/entity/User/Repositories";

export default async (req, res, next) => {
  try {
    console.log('ici')
    const { token } = req.params;
    const decryptToken = jwt.verify(token, config.jwt.secret);

    const user = await findOneUserById(decryptToken.userId);

    if (user && user.verified) throw new AccountAlreadyValidatedError();

    req.token = decryptToken;

    return next();
  } catch (error) {
    logger.error(`[middleware/validateAccount] - ${error.message}`);
    return customErrorResponse(res, error);
  }
};
