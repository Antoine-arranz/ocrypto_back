import axios from "axios";
import { insert } from "../../../storage/typeORM/entity/Event/Repositories";
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
    console.log(usd_amount);
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
    },
  ];

  console.log("eventAdded1", eventAdded);

  if (eventType === "sell" && CurrencyCounterparty !== "usd") {
    eventAdded.push({
      Wallet_Id: walletId,
      Platform_Id: platformId,
      type: "buy",
      date: eventDate,
      quantity: amount,
      amount: quantity,
      CurrencyAsset_Id: CurrencyCounterparty,
      CurrencyCounterparty_Id: CurrencyAsset,
      usd_amount,
      fees,
    });
  }

  console.log("eventAdded2", eventAdded);
  await insert(eventAdded);
};

export default addEvent;
