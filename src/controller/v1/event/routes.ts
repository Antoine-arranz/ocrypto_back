import express, { Request, Response } from "express";
import logger from "../../../config/logger";
import customErrorResponse from "../middlewares/customsErrorResponse";
import Event from "../../../service/Event";
import { eventSchemas, generalSchemas } from "../../../interfaces/joi";
export default () => {
  const EventService = new Event();

  const router = express.Router({ mergeParams: true });

  router.post("/:walletId/add", async (req: Request, res: Response) => {
    try {
      const walletId = await generalSchemas.idSchema.validateAsync(
        req.params.walletId
      );
      const platformId = await generalSchemas.idSchema.validateAsync(
        req.body.platformId
      );

      const eventType = await eventSchemas.type.validateAsync(req.body.type);
      const eventDate = await eventSchemas.date.validateAsync(req.body.date);

      const quantityBought = await eventSchemas.quantity.validateAsync(
        req.body.quantityBought
      );
      const quantitySell =
        req.body.quantitySell &&
        (await eventSchemas.quantity.validateAsync(req.body.quantitySell));
      const fees =
        req.body.fees && (await eventSchemas.fees.validateAsync(req.body.fees));

      const currencyBougth_Id = await generalSchemas.idSchema.validateAsync(
        req.body.currencyBougth
      );
      const currencySell_Id = await generalSchemas.idSchema.validateAsync(
        req.body.currencySell
      );

      const amountBought = await generalSchemas.idSchema.validateAsync(
        req.body.amountBought
      );
      const amountSell = await generalSchemas.idSchema.validateAsync(
        req.body.amountSell
      );

      await EventService.insert(
        walletId,
        platformId,
        eventType,
        eventDate,
        quantityBought,
        amountSell,
        amountBought,
        currencyBougth_Id,
        currencySell_Id,
        quantitySell,
        fees
      );

      return res.status(200).json({ err: false });
    } catch (error) {
      logger.error(
        `[event/add/${JSON.stringify(req.body)}] - ${error.message}`
      );
      return customErrorResponse(res, error);
    }
  });

  router.get("/:walletId", async (req: Request, res: Response) => {
    try {
      const walletId = await generalSchemas.idSchema.validateAsync(
        req.params.walletId
      );
      const events = await EventService.getEvents(walletId);

      return res.status(200).json({ err: false, result: events });
    } catch (error) {
      logger.error(
        `[event/get/${JSON.stringify(req.body)}] - ${error.message}`
      );
      return customErrorResponse(res, error);
    }
  });

  router.get("/quantity/:walletId", async (req: Request, res: Response) => {
    try {
      const walletId = await generalSchemas.idSchema.validateAsync(
        req.params.walletId
      );
      const quantityTotal = await EventService.getQuantityTotal(walletId);
      return res.status(200).json({ err: false, result: quantityTotal });
    } catch (error) {
      logger.error(
        `[event/get/${JSON.stringify(req.body)}] - ${error.message}`
      );
      return customErrorResponse(res, error);
    }
  });

  return router;
};
