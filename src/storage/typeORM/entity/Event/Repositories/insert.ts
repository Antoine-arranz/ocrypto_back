import { EventI } from "../../../../../interfaces/object";
import { Event } from "../";
import { createQueryBuilder } from "typeorm";

const insertPlatforms = async (eventAdded: any): Promise<any> => {
  // const event = await Event.create({
  //   type: eventType,
  //   date: eventDate,
  //   quantity,
  //   Wallet_Id: walletId,
  //   Platform_Id: platformId,
  //   CurrencyAsset_Id: CurrencyAsset,
  //   CurrencyCounterparty_Id: CurrencyCounterparty,
  //   amount,
  //   usd_amount,
  //   ...(fees && { fees }),
  // }).save();

  const event = await createQueryBuilder(Event)
    .insert()
    .values(eventAdded)
    .execute();

  console.log("event", event);

  return event;
};

export default insertPlatforms;
