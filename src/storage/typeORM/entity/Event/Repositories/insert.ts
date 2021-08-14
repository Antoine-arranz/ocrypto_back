import { EventI } from "../../../../../interfaces/object";
import { Event } from "../";

const insertPlatforms = async (
  walletId: number,
  platformId: number,
  eventType: string,
  eventDate: Date,
  quantityBougth: number,
  quantitySell?: number,
  fees?: number
): Promise<void> => {
  await Event.insert({
    type: eventType,
    date: eventDate,
    quantityBougth: quantityBougth,
    ...(quantitySell && { quantitySell }),
    ...(fees && { fees }),
    Wallet_Id: walletId,
    Platform_Id: platformId,
  });
};

export default insertPlatforms;
