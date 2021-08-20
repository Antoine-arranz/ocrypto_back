import axios from "axios";
import {
  insertEvent,
  findLastState,
  getLastUsdAmount,
} from "../../../storage/typeORM/entity/Event/Repositories";
import { insertCurrencyWallet } from "../../../storage/typeORM/entity/WalletHasCurrency/Repositories";

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
  let usdAmount = amount;
  let currencyAssetNewState = quantity;
  let currencyAssetNewCounterParty = amount;
  console.log("currencyAssetNewState", currencyAssetNewState);
  console.log("currencyAssetNewCounterParty", currencyAssetNewCounterParty);
  const currencyAssetLastState = await findLastState(walletId, CurrencyAsset);
  console.log("currencyAssetLastState", currencyAssetLastState);
  const currencyCounterPartyLastState = await findLastState(
    walletId,
    CurrencyCounterparty
  );
  console.log("currencyCounterPartyLastState", currencyCounterPartyLastState);
  if (currencyAssetLastState >= 0) {
    console.log("quantity", quantity);
    currencyAssetNewState =
      eventType === "buy"
        ? currencyAssetLastState + quantity
        : currencyAssetLastState - quantity;
    console.log("currencynewState", currencyAssetNewState);
  }

  if (CurrencyCounterparty !== "usd") {
    let countPartnewState = amount;
    if (currencyCounterPartyLastState >= 0) {
      countPartnewState =
        eventType === "buy"
          ? currencyCounterPartyLastState + amount
          : currencyCounterPartyLastState - amount;
      console.log("countPartnewState", countPartnewState);
    }
  }
  const lastEvent = await getLastUsdAmount(walletId);
  console.log("lastEvent", lastEvent);
  const lastUsdAmount = lastEvent ? lastEvent.Event_lastUsdAmount : amount;
  console.log("lastUsdAmount", lastUsdAmount);
  if (CurrencyCounterparty !== "usd") {
    const dateFormated = new Date(eventDate)
      .toLocaleDateString("fr", {
        year: "numeric",
        month: "2-digit",
        day: "numeric",
      })
      .split("/")
      .join("-");
    const currencyCounterparty = await axios.request({
      url: `https://api.coingecko.com/api/v3/coins/${CurrencyCounterparty}/history?date=${dateFormated}`,
      method: "GET",
    });

    const currencyAsset = await axios.request({
      url: `https://api.coingecko.com/api/v3/coins/${CurrencyAsset}/history?date=${dateFormated}`,
      method: "GET",
    });
    console.log(
      " currencyCounterparty.data.market_data.current_price.usd",
      currencyCounterparty.data.market_data.current_price.usd
    );

    console.log(
      " currencyAsset.data.market_data.current_price.usd",
      currencyAsset.data.market_data.current_price.usd
    );

    console.log("amount", amount);

    console.log("currencynewState", currencyCounterPartyLastState);
    usdAmount =
      lastUsdAmount -
      currencyCounterparty.data.market_data.current_price.usd *
        currencyAssetNewCounterParty +
      currencyAsset.data.market_data.current_price.usd * currencyAssetNewState;

    console.log("usdCounterParty", usdAmount);
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
      fees,
      lastState: currencyAssetNewState,
      currencyAssetNewState,
      lastUsdAmount: usdAmount,
    },
  ];

  if (CurrencyCounterparty !== "usd") {
    const counterPartLastState = await findLastState(
      walletId,
      CurrencyCounterparty
    );
    let countPartnewState = amount;
    if (counterPartLastState >= 0) {
      countPartnewState =
        eventType === "buy"
          ? counterPartLastState + amount
          : counterPartLastState - amount;
    }
    eventAdded.push({
      Wallet_Id: walletId,
      Platform_Id: platformId,
      type: eventType === "sell" ? "buy" : "sell",
      date: eventDate,
      quantity: amount,
      amount: quantity,
      CurrencyAsset_Id: CurrencyCounterparty,
      CurrencyCounterparty_Id: CurrencyAsset,
      fees,
      show: false,
      lastState: countPartnewState,
      lastUsdAmount: usdAmount,
    });
  }
  await insertEvent(eventAdded);
  await insertCurrencyWallet(eventAdded);
};

export default addEvent;
