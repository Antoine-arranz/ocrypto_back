import { Event } from "../";
import { createQueryBuilder } from "typeorm";

const getLastState = async (
  walletId: number,
  currencyAsset: string
): Promise<{ usdAmount: number; lastState: number }> => {
  const event: any = await createQueryBuilder(Event)
    .where("Event.Wallet_Id = :walletId", { walletId })
    .andWhere("Event.CurrencyAsset_Id = :currencyAsset", { currencyAsset })
    .orderBy("Event.date", "DESC")
    .limit(1)
    .select("Event.lastState")
    .addSelect("Event.usdAmount")
    .getOne();
  return event && event;
};

export default getLastState;
