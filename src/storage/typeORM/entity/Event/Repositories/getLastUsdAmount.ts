import { Event } from "..";
import { createQueryBuilder } from "typeorm";

const getLastUsdAmount = async (walletId: number): Promise<any> => {
  const event = await createQueryBuilder(Event)
    .where("Event.Wallet_Id = :walletId", { walletId })
    .select(["max(Event.date)", "Event.lastUsdAmount"])
    .groupBy("Event.lastUsdAmount")
    .addGroupBy("Event.date")

    .getRawOne();
  return event;
};

export default getLastUsdAmount;
