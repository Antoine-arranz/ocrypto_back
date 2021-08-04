import express, { Request, Response } from "express";
import logger from "../../../config/logger";
import customErrorResponse from "../middlewares/customsErrorResponse";
import { userSchemas } from "../../../interfaces/joi";
import { User } from "../../../service";
import { authToken, generateToken } from "../../../config/Token";
import jwt from "jsonwebtoken";
import config from "../../../config";
import privateRoute from "../middlewares/privateRoute";

export default () => {
  const UserService = new User();

  const router = express.Router({ mergeParams: true });

  router.post("/create", async (req: Request, res: Response) => {
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

  router.post("/login", async (req: Request, res: Response) => {
    try {
      const data = await userSchemas.loginSchema.validateAsync({
        email: req.body.email,
        password: req.body.password,
      });
      const user = await UserService.login(data);
      const payload = authToken(data.email);
      const token = await generateToken(payload);
      jwt.sign(JSON.stringify(payload), config.jwt.secret);

      res.cookie("jwt", token, config.jwt.cookie);

      const response = {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      };
      return res.status(200).json({ err: false, result: response });
    } catch (error) {
      logger.error(
        `[user/login/${JSON.stringify(req.body)}] - ${error.message}`
      );
      return customErrorResponse(res, error);
    }
  });

  router.use(privateRoute)

  router.get("/test", async (req: Request, res: Response) => {
    try {
     
      return res.status(200).json({ err: false });
    } catch (error) {
      logger.error(
        `[user/login/${JSON.stringify(req.body)}] - ${error.message}`
      );
      return customErrorResponse(res, error);
    }
  });
  return router;
};
