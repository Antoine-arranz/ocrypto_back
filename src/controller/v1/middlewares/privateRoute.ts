import jwt from "jsonwebtoken";
import { isEmpty } from "lodash";

import MongoDb from "../../../storage/mongoDB";
import customErrorResponse from "./customsErrorResponse";
import config from "../../../config";
import {
  AuthenticationError,
  AccountNotValidatedError,
} from "../../../interfaces/error/CustomsErrors";
import { findOneUserByEmail } from "../../../storage/typeORM/entity/User/Repositories";

export default async (req, res, next) => {
  try {
    const tokenWhitelist = new MongoDb();

    const token = req.cookies.jwt;
    const decodedToken: any = jwt.verify(token, config.jwt.secret);

    const result = await tokenWhitelist.findOne({ token });

    if (isEmpty(result.token) || Date.now() > decodedToken.exp) {
      throw new AuthenticationError();
    }

    const user = await findOneUserByEmail(decodedToken.email);

    if (!user) throw new AuthenticationError();
    if (!user.verified) throw new AccountNotValidatedError();

    req.user = user;

    return next();
  } catch (error) {
    return customErrorResponse(res, error);
  }
};
