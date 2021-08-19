import { Event } from "../";
import { createQueryBuilder } from "typeorm";

const getMinDate = async (walletId: number): Promise<any> => {
  const event = await createQueryBuilder(Event)
    .where("Event.Wallet_Id = :walletId", { walletId })
    .select('min(Event.date)','date')
    .getRawOne();
  return event;
};

export default getMinDate;
