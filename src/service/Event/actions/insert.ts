import { insert } from "../../../storage/typeORM/entity/Event/Repositories";
const addEvent = async (
  walletId: number,
  platformId: number,
  eventType: string,
  eventDate: Date,
  quantityBougth: number,
  quantitySell?: number,
  fees?: number
) => {
  await insert(
    walletId,
    platformId,
    eventType,
    eventDate,
    quantityBougth,
    quantitySell,
    fees
  );
};

export default addEvent;
