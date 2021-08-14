import axios from "axios";
import { insertPlatforms } from "../../../storage/typeORM/entity/Platform/Repositories";

const exchangeAPI = "https://api.coingecko.com/api/v3/exchanges";

const insert = async (): Promise<void> => {
  const test = await axios.request({
    url: exchangeAPI,
    method: "get",
  });

  const formatedData = await test.data.map((platform) => {
    return {
      name: platform.name,
      slug: platform.image,
    };
  });

  await insertPlatforms(formatedData);
};

export default insert;
