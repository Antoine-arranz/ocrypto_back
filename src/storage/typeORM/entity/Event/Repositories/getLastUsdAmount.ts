import { Event } from "..";
import { createQueryBuilder } from "typeorm";

const getLastUsdAmount = async (
  walletId: number
): Promise<Event | undefined> => {
  const event = await createQueryBuilder(Event)
    .where("Event.Wallet_Id = :walletId", { walletId })
    .select(["Event.date", "Event.lastUsdAmount"])
    .orderBy("Event.date", "DESC")
    .limit(1)
    .getOne();

  return event;
};

export default getLastUsdAmount;
