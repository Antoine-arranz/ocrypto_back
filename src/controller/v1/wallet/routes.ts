import express, { Request, Response } from "express";
import { Wallet } from "../../../service";
import logger from "../../../config/logger";
import customErrorResponse from "../middlewares/customsErrorResponse";
import { generalSchemas } from "../../../interfaces/joi";
import privateRoute from "../middlewares/privateRoute";

export default () => {
  const WalletService = new Wallet();

  const router = express.Router({ mergeParams: true });
  router.use(privateRoute);
  router.post("/:userId/new", async (req: Request, res: Response) => {
    try {
      const userId = await generalSchemas.idSchema.validateAsync(
        req.params.userId
      );
      const name = await generalSchemas.textSchema.validateAsync(req.body.name);
      const wallet = await WalletService.create(userId, name);
      return res.status(200).json({ err: false, result: wallet });
    } catch (error) {
      logger.error(
        `[wallet/new/${JSON.stringify(req.body)}] - ${error.message}`
      );
      return customErrorResponse(res, error);
    }
  });

  router.get("/:userId", async (req: Request, res: Response) => {
    try {
      const userId = await generalSchemas.idSchema.validateAsync(
        req.params.userId
      );

      const wallet = await WalletService.getWallets(userId);
      return res.status(200).json({ err: false, result: wallet });
    } catch (error) {
      logger.error(
        `[wallet/getAll/${JSON.stringify(req.body)}] - ${error.message}`
      );
      return customErrorResponse(res, error);
    }
  });

  router.delete("/:walletId", async (req: Request, res: Response) => {
    try {
      const walletId = await generalSchemas.idSchema.validateAsync(
        req.params.walletId
      );

      await WalletService.deleteWallet(walletId);
      return res.status(200).json({ err: false });
    } catch (error) {
      logger.error(
        `[wallet/delete/${JSON.stringify(req.body)}] - ${error.message}`
      );
      return customErrorResponse(res, error);
    }
  });

  router.patch("/:walletId", async (req: Request, res: Response) => {
    try {
      const walletId = await generalSchemas.idSchema.validateAsync(
        req.params.walletId
      );
      const name = await generalSchemas.textSchema.validateAsync(req.body.name);

      const wallet = await WalletService.update(walletId, name);
      return res.status(200).json({ err: false, result: wallet });
    } catch (error) {
      logger.error(
        `[wallet/delete/${JSON.stringify(req.body)}] - ${error.message}`
      );
      return customErrorResponse(res, error);
    }
  });
  return router;
};
