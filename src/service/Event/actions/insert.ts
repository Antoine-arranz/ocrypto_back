import axios from "axios";
import { newEvent } from "../../../interfaces/object";
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
  let usdAmountTotal;
  let currencyAssetNewState = quantity;
  let currencyAssetNewCounterParty = amount;
  let usdAssetAmount = amount;
  let usdCounterpartAmount;
  const currencyAssetLastState = await findLastState(walletId, CurrencyAsset);
  let currencyCounterPartyLastState = await findLastState(
    walletId,
    CurrencyCounterparty
  );
  if (currencyAssetLastState >= 0) {
    currencyAssetNewState =
      eventType === "buy"
        ? currencyAssetLastState + quantity
        : currencyAssetLastState - quantity;
  }

  if (CurrencyCounterparty !== "usd") {
    if (currencyCounterPartyLastState >= 0) {
      currencyAssetNewCounterParty =
        eventType === "buy"
          ? currencyCounterPartyLastState - amount
          : currencyCounterPartyLastState + amount;
    }
  }
  const lastEvent = await getLastUsdAmount(walletId);
  const lastUsdAmount = lastEvent
    ? CurrencyCounterparty === "usd"
      ? lastEvent.Event_lastUsdAmount + amount
      : lastEvent.Event_lastUsdAmount
    : amount;

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

    usdAssetAmount =
      currencyAsset.data.market_data.current_price.usd * currencyAssetNewState;

    usdCounterpartAmount =
      currencyCounterparty.data.market_data.current_price.usd * amount;

    usdAmountTotal = lastUsdAmount - usdAssetAmount + usdCounterpartAmount;
  } else {
    usdAmountTotal = lastUsdAmount;
  }

  let eventAdded: Array<newEvent> = [
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
      lastUsdAmount: usdAmountTotal,
      usdAmount: usdAssetAmount,
    },
  ];

  if (CurrencyCounterparty !== "usd") {
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
      currencyAssetNewState: currencyAssetNewCounterParty,
      show: false,
      lastState: currencyAssetNewCounterParty,
      lastUsdAmount: usdAmountTotal,
      usdAmount: usdCounterpartAmount,
    });
  }
  await insertEvent(eventAdded);
  await insertCurrencyWallet(eventAdded);
};

export default addEvent;
