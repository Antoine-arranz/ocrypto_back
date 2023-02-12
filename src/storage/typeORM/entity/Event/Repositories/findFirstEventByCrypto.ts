import { Event } from "../";
import { createQueryBuilder } from "typeorm";

const findFirstEventByAsset = async (
  walletId: number,
  asset: string
): Promise<{ min: Date }> => {
  const events = await createQueryBuilder(Event)
    .where("Event.Wallet_Id = :walletId", { walletId })
    .andWhere("Event.CurrencyAsset_Id = :asset", { asset })
    .select("min(Event.date)")
    .getRawOne();
  return events;
};

export default findFirstEventByAsset;
