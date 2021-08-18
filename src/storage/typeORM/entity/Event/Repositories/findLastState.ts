import { Event } from "../";
import { createQueryBuilder } from "typeorm";

const getLastState = async (walletId: number, currencyAsset : string): Promise<number>=> {
  const event: any = await createQueryBuilder(Event).where('Event.Wallet_Id = :walletId',{walletId})
  .andWhere('Event.CurrencyAsset_Id = :currencyAsset',{currencyAsset})
  .orderBy('Event.date', 'ASC')
  .limit(1)
  .select('Event.lastState').getOne()

  return event && event.lastState;
};

export default getLastState;
