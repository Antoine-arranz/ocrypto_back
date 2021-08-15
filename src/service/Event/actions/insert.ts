import { insert } from "../../../storage/typeORM/entity/Event/Repositories";
const addEvent = async (
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
) => {
  await insert(
    walletId,
    platformId,
    eventType,
    eventDate,
    quantityBougth,
    amountSell,
    amountBought,
    currencyBougth_Id,
    currencySell_Id,
    quantitySell,
    fees
  );
};

export default addEvent;
