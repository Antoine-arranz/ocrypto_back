import express, { Request, Response } from "express";
import logger from "../../../config/logger";
import customErrorResponse from "../middlewares/customsErrorResponse";
import Currency from "../../../service/Currency";
import privateRoute from "../middlewares/privateRoute";
export default () => {
  const CurrencyService = new Currency();

  const router = express.Router({ mergeParams: true });
  router.use(privateRoute);
  router.get("/", async (req: Request, res: Response) => {
    try {
      const currencies = await CurrencyService.getAllCurrencies();

      return res.status(200).json({ err: false, result: currencies });
    } catch (error) {
      logger.error(
        `[currencies/get/${JSON.stringify(req.body)}] - ${error.message}`
      );
      return customErrorResponse(res, error);
    }
  });

  router.get("/insert", async (req: Request, res: Response) => {
    try {
      await CurrencyService.insertCurrencies();

      return res.status(200).json({ err: false });
    } catch (error) {
      logger.error(
        `[currencies/insert/${JSON.stringify(req.body)}] - ${error.message}`
      );
      return customErrorResponse(res, error);
    }
  });
  return router;
};
