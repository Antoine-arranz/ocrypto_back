import { Event } from "..";
import { createQueryBuilder } from "typeorm";

const getFirstEvent = async (walletId: number): Promise<Event> => {
  const event = await createQueryBuilder(Event)
    .where("Event.Wallet_Id = :walletId", { walletId })
    .select("min(Event.date)", "date")
    .getRawOne();
  return event;
};

export default getFirstEvent;
