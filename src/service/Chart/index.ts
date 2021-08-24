import { getFirstEvent } from "../../storage/typeORM/entity/Event/Repositories";
import { getQuantity } from "../Event/actions";
import getAllEvents from "../Event/actions/getAll";
import axios from "axios";
import findFirstEventByAsset from "../../storage/typeORM/entity/Event/Repositories/findFirstEventByCrypto";
import { dateDiff, getArrayOfTimestamp } from "../Helper";
import ensure from "../Helper/ensure";
import { getQuantityName } from "./actions";
import { Event } from "../../storage/typeORM/entity/Event";

class ChartService {
  public async getChart(walletId: number):Promise<{timestamps:Array<Date>,currencies:Array<number>, usdAmount:Array<number>} | undefined> {

    const events = await getAllEvents(walletId);
    if (events.length === 0) {
      return;
    }

    const walletValue: Array<{price : Array<number | undefined>}> = [];
    const currencies:any = [];  

    const quantity = await getQuantityName(walletId);
  
    const firstEvent = await getFirstEvent(walletId);
    const timestamps =
        firstEvent.date && getArrayOfTimestamp(firstEvent.date, new Date());

      await Promise.all(
        quantity.map(async (currency) => {

          const startAt = await findFirstEventByAsset(walletId, currency.Currency_Id);
          const assetTimestamp = getArrayOfTimestamp(startAt.min, new Date());

          const dayDiff = dateDiff(startAt.min, new Date());
          const url = `https://api.coingecko.com/api/v3/coins/${currency.Currency_Id}/market_chart?vs_currency=usd&days=${dayDiff + 1}&interval=daily`;
          const result = await axios.request({ url, method: "GET" });

          walletValue.push({
            price: assetTimestamp.map((date, index) => {
              const findDate = new Date(date);
              const price = events.find((asset) => {
                return (
                  asset.CurrencyAsset_Id === currency.Currency_Id &&
                  new Date(asset.date) <= findDate
                );
              });
              return price
                && price.lastState * result.data.prices[index][1]
                
            }),
          });
        })
      );
      walletValue.forEach((currency) => {
        currency.price.reverse();
      });

      timestamps.forEach((date, i) => {
        walletValue.forEach((currency) => {
          currencies[i] = currencies[i]
            ? currency.price[i]
              ? currency.price[i] + currencies[i] 
              : currencies[i]
            : currency.price[i];
        });
      });

      currencies.reverse();

      const usdAmount = timestamps.map((date) => {
        const findDate = new Date(date);
        const usdAmount = ensure(events.find((asset:Event) => {
          return new Date(asset.date) <= findDate;
        }));
        return usdAmount && usdAmount.lastUsdAmount;
      });
  
  
      return { timestamps, currencies, usdAmount };
    }
}

export default ChartService;
