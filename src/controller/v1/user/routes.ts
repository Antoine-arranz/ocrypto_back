import express, { Request, Response } from "express";
import logger from "../../../config/logger";
import customErrorResponse from "../middlewares/customsErrorResponse";
export default () => {
  const router = express.Router({ mergeParams: true });

  router.get("/", async (req: Request, res: Response) => {
    try {
      console.log("coucou");
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
