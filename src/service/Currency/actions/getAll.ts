import { Platform } from "src/storage/typeORM/entity/Platform";
import { getAllCurrencies } from "../../../storage/typeORM/entity/Currency/Repositories";
import { Currency } from "../../../storage/typeORM/entity/Currency";
const getAll = async (): Promise<Array<Currency>> => {
  const currencies = await getAllCurrencies();

  return currencies;
};

export default getAll;
