import express, { Request, Response } from "express";
import logger from "../../../config/logger";
import customErrorResponse from "../middlewares/customsErrorResponse";
import Platform from "../../../service/Platform";
export default () => {
  const PlatformService = new Platform();

  const router = express.Router({ mergeParams: true });

  router.get("/insertPlatforms", async (req: Request, res: Response) => {
    try {
      const test = await PlatformService.insert();

      return res.status(200).json({ err: false, result: test });
    } catch (error) {
      logger.error(
        `[platform/insert/${JSON.stringify(req.body)}] - ${error.message}`
      );
      return customErrorResponse(res, error);
    }
  });

  router.get("/", async (req: Request, res: Response) => {
    try {
      const platforms = await PlatformService.getAllPlatforms();

      return res.status(200).json({ err: false, result: platforms });
    } catch (error) {
      logger.error(
        `[platform/get/${JSON.stringify(req.body)}] - ${error.message}`
      );
      return customErrorResponse(res, error);
    }
  });
  return router;
};
