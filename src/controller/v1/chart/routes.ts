import express, { Request, Response } from "express";
import logger from "../../../config/logger";
import customErrorResponse from "../middlewares/customsErrorResponse";
import Chart from "../../../service/Chart";
import { generalSchemas } from "../../../interfaces/joi";
export default () => {
  const CharService = new Chart();

  const router = express.Router({ mergeParams: true });

  router.get("/:walletId", async (req: Request, res: Response) => {
    try {
      const walletId = await generalSchemas.idSchema.validateAsync(
        req.params.walletId
      );
      const chart = await CharService.getChart(walletId);
      return res.status(200).json({ err: false, result: chart });
    } catch (error) {
      logger.error(
        `[currencies/get/${JSON.stringify(req.body)}] - ${error.message}`
      );
      return customErrorResponse(res, error);
    }
  });

  return router;
};
