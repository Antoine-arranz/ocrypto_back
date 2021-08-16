import { insert } from "../../../storage/typeORM/entity/Event/Repositories";
const addEvent = async (
  walletId: number,
  platformId: number,
  eventType: string,
  eventDate: Date,
  quantity: number,
  amount:number,
  CurrencyAsset: number,
  CurrencyCounterparty: number,
  fees?: number
) => {
  await insert(
    walletId,
    platformId,
    eventType,
    eventDate,
    quantity,
    amount,
    CurrencyAsset,
    CurrencyCounterparty,
    fees 
  );
};

export default addEvent;
