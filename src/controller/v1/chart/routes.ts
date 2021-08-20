import express, { Request, Response } from "express";
import logger from "../../../config/logger";
import customErrorResponse from "../middlewares/customsErrorResponse";
import Chart from "../../../service/Chart";
export default () => {
  const CharServuce = new Chart();

  const router = express.Router({ mergeParams: true });

  router.get("/:walletId", async (req: Request, res: Response) => {
    try {
      const chart = await CharServuce.getChart(req.params.walletId);
      console.log("chart", chart);
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
