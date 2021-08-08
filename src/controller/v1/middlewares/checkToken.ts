import jwt from "jsonwebtoken";
import { isEmpty } from "lodash";

import MongoDb from "../../../storage/mongoDB";
import customErrorResponse from "./customsErrorResponse";
import config from "../../../config";
import logger from "../../../config/logger";
import { TokenExpiredError } from "../../../interfaces/error/CustomsErrors";

export default async (req, res, next) => {
  try {
    console.log("iciicicii");

    const tokenWhitelist = new MongoDb();

    const { token } = req.params;
    const decryptToken: any = jwt.verify(token, config.jwt.secret);

    if (Date.now() > decryptToken.exp) {
      throw new TokenExpiredError();
    }

    const result = await tokenWhitelist.findOne({ token });

    if (isEmpty(result.token)) {
      throw new TokenExpiredError();
    }

    req.token = decryptToken;

    return next();
  } catch (error) {
    logger.error(`[middleware/checkToken] - ${error.message}`);
    return customErrorResponse(res, error);
  }
};
