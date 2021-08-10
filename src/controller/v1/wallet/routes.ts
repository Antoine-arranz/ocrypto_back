import express, { Request, Response } from "express";
import { Wallet } from "../../../service";
import logger from "../../../config/logger";
import customErrorResponse from "../middlewares/customsErrorResponse";
import { generalSchemas } from "../../../interfaces/joi";

export default () => {
  const WalletService = new Wallet();

  const router = express.Router({ mergeParams: true });

  router.post("/:userId/new", async (req: Request, res: Response) => {
    try {
      console.log("addOne");
      const userId = await generalSchemas.idSchema.validateAsync(
        req.params.userId
      );
      const name = await generalSchemas.textSchema.validateAsync(req.body.data);
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
      console.log("getAll");
      const userId = await generalSchemas.idSchema.validateAsync(
        req.params.userId
      );

      const wallet = await WalletService.getWallets(userId);
      return res.status(200).json({ err: false, result: wallet });
    } catch (error) {
      console.log("error", error);
      logger.error(
        `[wallet/getAll/${JSON.stringify(req.body)}] - ${error.message}`
      );
      return customErrorResponse(res, error);
    }
  });

  router.delete("/:walletId", async (req: Request, res: Response) => {
    try {
      console.log("delete");
      const walletId = await generalSchemas.idSchema.validateAsync(
        req.params.walletId
      );

      const wallet = await WalletService.deleteWallet(walletId);
      return res.status(200).json({ err: false });
    } catch (error) {
      console.log("error", error);
      logger.error(
        `[wallet/delete/${JSON.stringify(req.body)}] - ${error.message}`
      );
      return customErrorResponse(res, error);
    }
  });

  return router;
};
