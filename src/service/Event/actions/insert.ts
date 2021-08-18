import axios from "axios";
import { insertEvent, findLastState } from "../../../storage/typeORM/entity/Event/Repositories";
import {insertCurrencyWallet} from '../../../storage/typeORM/entity/WalletHasCurrency/Repositories'

const addEvent = async (
  walletId: number,
  platformId: number,
  eventType: string,
  eventDate: Date,
  quantity: number,
  amount: number,
  CurrencyAsset: string,
  CurrencyCounterparty: string,
  fees?: number
) => {
  let usd_amount = amount;

  if (CurrencyCounterparty !== "usd") {
    const dateFormated = new Date(eventDate)
      .toLocaleDateString("fr", {
        year: "numeric",
        month: "2-digit",
        day: "numeric",
      })
      .split("/")
      .join("-");
    const currency = await axios.request({
      url: `https://api.coingecko.com/api/v3/coins/${CurrencyCounterparty}/history?date=${dateFormated}`,
      method: "GET",
    });

    usd_amount = currency.data.market_data.current_price.usd * amount;
  }

const currencylastState = await findLastState(walletId,CurrencyAsset)

let currencynewState = quantity
if(currencylastState >=0){
  currencynewState =  eventType === 'buy' ? currencylastState + quantity : currencylastState - quantity

}
  let eventAdded: any = [
    {
      Wallet_Id: walletId,
      Platform_Id: platformId,
      type: eventType,
      date: eventDate,
      quantity,
      amount,
      CurrencyAsset_Id: CurrencyAsset,
      CurrencyCounterparty_Id: CurrencyCounterparty,
      usd_amount,
      fees,
      lastState : currencynewState
    },
  ];

  if(CurrencyCounterparty !== "usd"){
    const counterPartLastState = await findLastState(walletId,CurrencyCounterparty)
    let countPartnewState = amount
      if(counterPartLastState >=0){
        countPartnewState =  eventType === 'buy' ? counterPartLastState + amount : counterPartLastState - amount

      }
      eventAdded.push({
        Wallet_Id: walletId,
        Platform_Id: platformId,
        type: eventType === 'sell' ? 'buy' : 'sell',
        date: eventDate,
        quantity: amount,
        amount: quantity,
        CurrencyAsset_Id: CurrencyCounterparty,
        CurrencyCounterparty_Id: CurrencyAsset,
        usd_amount,
        fees,
        show : false,
        lastState : countPartnewState
      }); 
  
  }
  await insertEvent(eventAdded);
  await insertCurrencyWallet(eventAdded)
};

export default addEvent;
