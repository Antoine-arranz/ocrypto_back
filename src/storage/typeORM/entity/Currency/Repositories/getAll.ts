import { Currency } from "../index";

const getAllCurrencies = async (): Promise<Array<Currency>> => {
  const platforms = await Currency.find();

  return platforms;
};

export default getAllCurrencies;
