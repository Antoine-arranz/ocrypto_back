import axios from "axios";
import { insertCurrencies } from "../../../storage/typeORM/entity/Currency/Repositories";

const currenciesAPI =
  "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=1000000000";

const insert = async (): Promise<void> => {
  const test = await axios.request({
    url: currenciesAPI,
    method: "get",
  });

  const formatedData = await test.data.map((currency) => {
    return {
      name: currency.name,
      slug: currency.image,
    };
  });

  await insertCurrencies(formatedData);
};

export default insert;
