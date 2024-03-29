import WalletHasCurrency from "../WalletHasCurrency";

const insertCurrencyWallet = async (data: any): Promise<void> => {
  const [currencyAsset, CurrencyCounterparty] = data;
  const currencyAssetToAdd = await WalletHasCurrency.findOne({
    where: {
      Wallet_Id: currencyAsset.Wallet_Id,
      Currency_Id: currencyAsset.CurrencyAsset_Id,
    },
  });

  if (currencyAssetToAdd) {
    currencyAssetToAdd.currencyTotal = currencyAsset.lastState;
    currencyAssetToAdd.usdAmount = currencyAsset.usdAmount;
    currencyAssetToAdd.save();
  } else {
    WalletHasCurrency.create({
      Wallet_Id: currencyAsset.Wallet_Id,
      Currency_Id: currencyAsset.CurrencyAsset_Id,
      currencyTotal: currencyAsset.quantity,
      usdAmount: currencyAsset.usdAmount,
    }).save();
  }

  if (CurrencyCounterparty) {
    const currencyCounterPartToAdd = await WalletHasCurrency.findOne({
      where: {
        Wallet_Id: CurrencyCounterparty.Wallet_Id,
        Currency_Id: CurrencyCounterparty.CurrencyAsset_Id,
      },
    });
    if (currencyCounterPartToAdd) {
      currencyCounterPartToAdd.currencyTotal = CurrencyCounterparty.lastState;
      currencyCounterPartToAdd.usdAmount = CurrencyCounterparty.usdAmount;
      currencyCounterPartToAdd.save();
    } else {
      WalletHasCurrency.create({
        Wallet_Id: CurrencyCounterparty.Wallet_Id,
        Currency_Id: CurrencyCounterparty.CurrencyAsset_Id,
        currencyTotal: CurrencyCounterparty.quantity,
        usdAmount: CurrencyCounterparty.usdAmount,
      }).save();
    }
  }
};

export default insertCurrencyWallet;
