import WalletHasCurrency from "../WalletHasCurrency";

const getAll = async (walletId: number): Promise<Array<WalletHasCurrency>> => {
  const quantityTotal = await WalletHasCurrency.find({
    where: { Wallet_Id: walletId },
    relations: ["Currency"],
  });
  return quantityTotal;
};

export default getAll;
