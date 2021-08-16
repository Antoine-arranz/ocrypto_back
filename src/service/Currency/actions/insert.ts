import axios from "axios";
import { insertCurrencies } from "../../../storage/typeORM/entity/Currency/Repositories";

const currenciesAPI =
  "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=1000000000";

const insert = async (): Promise<void> => {
  const currencies = await axios.request({
    url: currenciesAPI,
    method: "get",
  });

  const formatedData = await currencies.data.map((currency) => {
    return {
      apiId: currency.id,
      name: currency.name,
      symbol: currency.symbol,
      image: currency.image,
    };
  });

  await insertCurrencies(formatedData);
};

export default insert;
