import { Event } from "../";
import { createQueryBuilder } from "typeorm";

const getAllShowed = async (walletId: number): Promise<Array<any>> => {
  const events = await createQueryBuilder(Event)
    .leftJoinAndSelect("Event.CurrencyAsset", "CurrencyBought")
    .leftJoinAndSelect("Event.CurrencyCounterparty", "CurrencySell")
    .leftJoinAndSelect("Event.Platform", "Platform")
    .where("Event.Wallet_Id = :walletId", { walletId })
    .andWhere("Event.show = true")
    .getMany();
  return events;
};

export default getAllShowed;
