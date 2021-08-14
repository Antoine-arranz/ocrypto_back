import * as currencyActions from "./actions";

class CurrencyService {
  public async getAllCurrencies() {
    const currencies = await currencyActions.getAll();
    return currencies;
  }

  public async insertCurrencies() {
    await currencyActions.insert();
  }
}

export default CurrencyService;
