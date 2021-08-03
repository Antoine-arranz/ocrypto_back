import express, { Request, Response } from "express";
import logger from "../../../config/logger";
import customErrorResponse from "../middlewares/customsErrorResponse";
import { userSchemas } from "../../../interfaces/joi";
import { User } from "../../../service";

export default () => {
  const UserService = new User();

  const router = express.Router({ mergeParams: true });

  router.post("/", async (req: Request, res: Response) => {
    try {
      const data = await userSchemas.signupSchema.validateAsync(req.body);
      const newUser = await UserService.create(data);

      return res.status(200).json({ err: false, result: newUser });
    } catch (error) {
      logger.error(
        `[user/login/${JSON.stringify(req.body)}] - ${error.message}`
      );
      return customErrorResponse(res, error);
    }
  });
  return router;
};
