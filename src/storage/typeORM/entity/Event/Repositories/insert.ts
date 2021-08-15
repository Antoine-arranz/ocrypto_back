import { EventI } from "../../../../../interfaces/object";
import { Event } from "../";

const insertPlatforms = async (
  walletId: number,
  platformId: number,
  eventType: string,
  eventDate: Date,
  quantityBougth: number,
  amountSell: number,
  amountBought: number,
  currencyBougth_Id: number,
  currencySell_Id: number,
  quantitySell?: number,
  fees?: number
): Promise<Event> => {
  const event = await Event.create({
    type: eventType,
    date: eventDate,
    quantityBougth: quantityBougth,
    ...(quantitySell && { quantitySell }),
    ...(fees && { fees }),
    Wallet_Id: walletId,
    Platform_Id: platformId,
    CurrencyBought_Id: currencyBougth_Id,
    CurrencySell_Id: currencySell_Id,
    amountSell,
    amountBought,
  }).save();

  return event;
};

export default insertPlatforms;
