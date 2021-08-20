import { getFirstEvent } from "../../storage/typeORM/entity/Event/Repositories";
import { getManager } from "typeorm";
import { getQuantity } from "../Event/actions";
import getAllEvents from "../Event/actions/getAll";
import axios from "axios";
import findFirstEventByAsset from "../../storage/typeORM/entity/Event/Repositories/findFirstEventByCrypto";

class ChartService {
  public async getChart(walletId: number) {
    let dateDiff = function (date1, date2) {
      const dt1 = new Date(date1);
      const dt2 = new Date(date2);
      return Math.floor(
        (Date.UTC(dt2.getFullYear(), dt2.getMonth(), dt2.getDate()) -
          Date.UTC(dt1.getFullYear(), dt1.getMonth(), dt1.getDate())) /
          (1000 * 60 * 60 * 24)
      );
    };

    function getArrayOfTimestamp(startDate, stopDate): Array<Date> {
      const currentDate = new Date(startDate);
      let timestamp: any = [];
      while (currentDate < stopDate) {
        timestamp.push(new Date(currentDate));
        currentDate.setDate(currentDate.getDate() + 1);
      }
      return timestamp;
    }

    const events = await getAllEvents(walletId);
    if (events.length === 0) {
      return;
    }
    const quantity = await getQuantity(walletId);
    const eventCurrencies = quantity.map((currency) => {
      return {
        currency: currency.Currency.symbol.toUpperCase(),
        name: currency.Currency_Id,
      };
    });

    const firstEvent = await getFirstEvent(walletId);

    const timestamps =
      firstEvent.date && getArrayOfTimestamp(firstEvent.date, new Date());
    const zizi: any = [];
    const currencies: any = [];
    await Promise.all(
      eventCurrencies.map(async (currency) => {
        const resultPrice: any = [];
        const startAt = await findFirstEventByAsset(walletId, currency.name);
        const timestampsChart = getArrayOfTimestamp(startAt.min, new Date());
        const dayDiff = dateDiff(startAt.min, new Date());

        const url = `https://api.coingecko.com/api/v3/coins/${currency.name}/market_chart?vs_currency=usd&days=${dayDiff}&interval=daily`;
        const result = await axios.request({ url, method: "GET" });
        zizi.push({
          timestampsChart,
          price: timestampsChart.map((date, index) => {
            const findDate = new Date(date);
            const price = events.find((asset) => {
              return (
                asset.CurrencyAsset_Id === currency.name &&
                new Date(asset.date) <= findDate
              );
            });
            return price
              ? price.lastState * result.data.prices[index][1]
              : resultPrice[index - 1] * result.data.prices[index][1];
          }),

          currency: currency.name,
        });
      })
    );

    const usdAmount = timestamps.map((date, index) => {
      const findDate = new Date(date);
      const usdAmount = events.find((asset) => {
        return new Date(asset.date) <= findDate;
      });
      return usdAmount?.lastUsdAmount;
    });
    console.log("usdAmount", usdAmount);

    zizi.forEach((a) => {
      a.price.reverse();
    });
    timestamps.forEach((date, i) => {
      zizi.forEach((caca) => {
        currencies[i] = currencies[i]
          ? caca.price[i]
            ? currencies[i] + caca.price[i]
            : currencies[i]
          : caca.price[i];
      });
    });

    currencies.reverse();

    return { timestamps, currencies, usdAmount };
  }
}

export default ChartService;
