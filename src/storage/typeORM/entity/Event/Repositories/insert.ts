import { EventI } from "../../../../../interfaces/object";
import { Event } from "../";

const insertPlatforms = async (
  walletId: number,
  platformId: number,
  eventType: string,
  eventDate: Date,
  quantity: number,
  amount:number,
  CurrencyAsset: number,
  CurrencyCounterparty: number,
  fees?: number
): Promise<Event> => {
  const event = await Event.create({
    type: eventType,
    date: eventDate,
    quantity,
    Wallet_Id: walletId,
    Platform_Id: platformId,
    CurrencyAsset_Id : CurrencyAsset,
    CurrencyCounterparty_Id : CurrencyCounterparty,
    amount,
    ...(fees && { fees }),
  }).save();

  return event;
};

export default insertPlatforms;
