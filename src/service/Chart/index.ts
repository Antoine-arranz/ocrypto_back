import { getMinDate } from "../../storage/typeORM/entity/Event/Repositories";
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

    const getQuantityArray = (data, asset) => {
      data[0].timestamps.forEach((test, i) => {
        const findDate = new Date(test);
        const lol: any = events.find((a) => {
          return a.CurrencyAsset_Id === asset && new Date(a.date) <= findDate;
        });
        data[0].prices[i] *= lol.lastState;
      });
      return data[0];
    };

    function getArrayOfTimestamp(startDate, stopDate) {
      const currentDate = new Date(startDate);
      let timestamp: any = [];
      while (currentDate < stopDate) {
        timestamp.push(new Date(currentDate));
        currentDate.setDate(currentDate.getDate() + 1);
      }
      return timestamp;
    }

    const events = await getAllEvents(walletId);

    const quantity = await getQuantity(walletId);
    const currencies = quantity.map((currency) => {
      return {
        currency: currency.Currency.symbol.toUpperCase(),
        name: currency.Currency_Id,
      };
    });

    console.log("currencies", currencies);
    const startDate = await getMinDate(walletId);

    function convertDate(inputFormat) {
      function pad(s) {
        return s < 10 ? "0" + s : s;
      }
      let d = new Date(inputFormat);
      return [d.getFullYear(), pad(d.getMonth() + 1), pad(d.getDate())].join(
        "-"
      );
    }

    const timestamps =
      startDate.date && getArrayOfTimestamp(startDate.date, new Date());

    console.log(timestamps);
    const zizi: any = [];
    await Promise.all([
      currencies.map(async (currency) => {
        const startAt = await findFirstEventByAsset(walletId, currency.name);
        console.log(startAt.min.toISOString());
        console.log(new Date());
        console.log(currency.currency);

        const test = dateDiff(startAt.min, new Date());
        console.log(test);
        const url = `https://api.coingecko.com/api/v3/coins/${currency.name}/market_chart?vs_currency=usd&days=${test}&interval=daily`;
        const result = await axios.request({ url, method: "GET" });
        zizi.push({
          timestamps: getArrayOfTimestamp(startAt.min, new Date()),
          price: result.data.prices.map((price) => price[1]),
          currency: currency.name,
          aaa: timestamps.map((a) => a),
        });
        console.log(zizi);
      }),
    ]);

    return { timestamps };
  }
}

export default ChartService;
